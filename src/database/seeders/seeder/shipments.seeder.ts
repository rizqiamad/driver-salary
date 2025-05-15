import csvParser from "csv-parser";
import { createReadStream } from "fs";
import { join } from "path";
import { pool } from "../../db";

interface IShipment {
  shipment_no: string;
  shipment_date: Date;
  shipment_status: "RUNNING" | "DONE" | "CANCELED";
}

export async function seedShipments() {
  const results: IShipment[] = [];

  return new Promise((resolve, reject) => {
    createReadStream(join(__dirname, "..", "csv", "shipments.csv"))
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          for (const row of results) {
            await pool.query(
              "INSERT INTO shipments (shipment_no, shipment_date, shipment_status) VALUES ($1, $2, $3)",
              [row.shipment_no, row.shipment_date, row.shipment_status]
            );
          }
          resolve(`[Seeder]: shipments seed success`);
        } catch (err) {
          reject(`[Seeder]: Error seeding shipments \n${err}`);
        }
      });
  });
}
