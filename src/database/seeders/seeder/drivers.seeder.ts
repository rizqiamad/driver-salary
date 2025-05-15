import csvParser from "csv-parser";
import { createReadStream } from "fs";
import { join } from "path";
import { pool } from "../../db";

interface IDriver {
  id: number;
  driver_code: string;
  name: string;
}

export async function seedDrivers() {
  const results: IDriver[] = [];

  return new Promise((resolve, reject) => {
    createReadStream(join(__dirname, "..", "csv", "drivers.csv"))
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          for (const row of results) {
            await pool.query(
              "INSERT INTO drivers (id, driver_code, name) VALUES ($1, $2, $3)",
              [row.id, row.driver_code, row.name]
            );
          }
          resolve(`[Seeder]: drivers seed success`);
        } catch (err) {
          reject(`[Seeder]: Error seeding drivers \n${err}`);
        }
      });
  });
}
