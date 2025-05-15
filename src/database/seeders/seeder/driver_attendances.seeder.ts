import csvParser from "csv-parser";
import { createReadStream } from "fs";
import { join } from "path";
import { pool } from "../../db";

interface IDriverAttandance {
  id: number;
  driver_code: string;
  attendance_date: Date;
  attendance_status: boolean;
}

export async function seedDriverAttendances() {
  const results: IDriverAttandance[] = [];

  return new Promise((resolve, reject) => {
    createReadStream(join(__dirname, "..", "csv", "driver_attendances.csv"))
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          for (const row of results) {
            await pool.query(
              "INSERT INTO driver_attendances (id, driver_code, attendance_date, attendance_status) VALUES ($1, $2, $3, $4)",
              [
                row.id,
                row.driver_code,
                row.attendance_date,
                row.attendance_status,
              ]
            );
          }
          resolve(`[Seeder]: driver_attendances seed success`);
        } catch (err) {
          reject(`[Seeder]: Error seeding driver_attendances \n${err}`);
        }
      });
  });
}
