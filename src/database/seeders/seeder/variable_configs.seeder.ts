import csvParser from "csv-parser";
import { createReadStream } from "fs";
import { join } from "path";
import { pool } from "../../db";

interface IVaribleConfig {
  key: string;
  value: number;
}

export async function seedVariableConfigs() {
  const results: IVaribleConfig[] = [];

  return new Promise((resolve, reject) => {
    createReadStream(join(__dirname, "..", "csv", "variable_configs.csv"))
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          for (const row of results) {
            await pool.query(
              "INSERT INTO variable_configs (key, value) VALUES ($1, $2)",
              [row.key, row.value]
            );
          }
          resolve(`[Seeder]: varible_configs seed success`);
        } catch (err) {
          reject(`[Seeder]: Error seeding varible_configs \n${err}`);
        }
      });
  });
}
