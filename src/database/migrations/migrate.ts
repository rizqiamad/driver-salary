import dotenv from "dotenv";
dotenv.config();
import { readFileSync } from "fs";
import { pool } from "../db";
import { join } from "path";

async function migrate() {
  const query = readFileSync(join(__dirname, "init", "migration.sql"), "utf-8");
  try {
    await pool.query(query);
    console.error(`[Migration]: Migration run successfully`);
  } catch (err) {
    console.error(`[Migration]: Error occured when migrating \n${err}`);
  } finally {
    pool.end();
  }
}

migrate();
