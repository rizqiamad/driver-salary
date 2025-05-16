import { IQueryURL } from "../controllers/salary.controller";

export function queryBuilder(
  queryUrl: IQueryURL,
  queryConfig: Array<string | number>
): string {
  let totalQuery: number = 1;
  let baseQuery: string = `
    WITH attendance AS (
      SELECT 
        da.driver_code, 
        SUM(CASE WHEN da.attendance_status = TRUE THEN 1 ELSE 0 END) as total_attendance
      FROM "driver_attendances" da
      WHERE da.attendance_status != FALSE
  `;
  if (queryUrl.month) {
    totalQuery++;
    baseQuery += ` AND DATE_PART('month', da.attendance_date) = $${totalQuery}`;
    queryConfig.push(Number(queryUrl.month));
  }
  if (queryUrl.year) {
    totalQuery++;
    baseQuery += ` AND DATE_PART('year', da.attendance_date) = $${totalQuery}`;
    queryConfig.push(Number(queryUrl.year));
  }
  baseQuery += `
          GROUP BY da.driver_code
        ),
      shipment_salary AS (
        SELECT 
          sc.driver_code, 
          d.name, 
          SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END) AS total_confirmed,
          SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END) AS total_pending,
          SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END) AS total_paid
        FROM "shipment_costs" sc
        JOIN "drivers" d on sc.driver_code = d.driver_code
        JOIN "shipments" s on sc.shipment_no = s.shipment_no
        WHERE s.shipment_status != 'CANCELLED' 
      `;

  if (queryUrl.month) {
    totalQuery++;
    baseQuery += ` AND DATE_PART('month', s.shipment_date) = $${totalQuery}`;
    queryConfig.push(Number(queryUrl.month));
  }

  if (queryUrl.year) {
    totalQuery++;
    baseQuery += ` AND DATE_PART('year', s.shipment_date) = $${totalQuery}`;
    queryConfig.push(Number(queryUrl.year));
  }

  baseQuery += `
        GROUP BY sc.driver_code, d.name
      )
      SELECT 
        d.driver_code,
        d.name,
        TRIM_SCALE(ss.total_pending) AS total_pending,
        TRIM_SCALE(ss.total_confirmed) AS total_confirmed,
        TRIM_SCALE(ss.total_paid) AS total_paid,
        ($1 * a.total_attendance) AS total_attendance_salary,
        TRIM_SCALE(($1 * a.total_attendance + ss.total_confirmed + ss.total_paid + ss.total_pending)) AS total_salary
      FROM "drivers" d
      JOIN "shipment_salary" ss ON d.driver_code = ss.driver_code
      JOIN "attendance" a ON d.driver_code = a.driver_code
      WHERE d.name != ''
  `;

  if (queryUrl.driver_code) {
    totalQuery++;
    baseQuery += ` AND d.driver_code = $${totalQuery}`;
    queryConfig.push(queryUrl.driver_code);
  }

  if (queryUrl.name) {
    totalQuery++;
    baseQuery += ` AND d.name = $${totalQuery}`;
    queryConfig.push(queryUrl.name);
  }

  if (queryUrl.status) {
    switch (queryUrl.status) {
      case "PENDING":
        baseQuery += ` AND ss.total_pending > 0`;
        break;
      case "CONFIRMED":
        baseQuery += ` AND ss.total_confirmed > 0`;
        break;
      case "PAID":
        baseQuery += ` AND ss.total_paid > 0`;
        break;
      default:
        break;
    }
  }

  baseQuery += `
      ORDER BY d.driver_code
  `;

  if (queryUrl.page_size) {
    totalQuery++;
    baseQuery += ` LIMIT $${totalQuery}`;
    queryConfig.push(Number(queryUrl.page_size));
  }

  if (queryUrl.current && queryUrl.page_size) {
    totalQuery++;
    baseQuery += ` OFFSET $${totalQuery}`;
    queryConfig.push(
      Number(queryUrl.current) * Number(queryUrl.page_size) -
        Number(queryUrl.page_size)
    );
  }

  return baseQuery;
}
