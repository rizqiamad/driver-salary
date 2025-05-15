import csvParser from "csv-parser";
import { createReadStream } from "fs";
import { join } from "path";
import { pool } from "../../db";

interface IShipmentCost {
  id: number;
  driver_code: string;
  shipment_no: string;
  total_costs: number;
  cost_status: "PENDING" | "CONFIRMED" | "PAID";
}

export async function seedShipmentCosts() {
  const results: IShipmentCost[] = [];

  return new Promise((resolve, reject) => {
    createReadStream(join(__dirname, "..", "csv", "shipment_costs.csv"))
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          for (const row of results) {
            await pool.query(
              "INSERT INTO shipment_costs (id, driver_code, shipment_no, total_costs, cost_status) VALUES ($1, $2, $3, $4, $5)",
              [
                row.id,
                row.driver_code,
                row.shipment_no,
                row.total_costs,
                row.cost_status,
              ]
            );
          }
          resolve(`[Seeder]: shipment_costs seed success`);
        } catch (err) {
          reject(`[Seeder]: Error seeding shipment_costs \n${err}`);
        }
      });
  });
}
