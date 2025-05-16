import { Request, Response } from "express";
import { pool } from "../database/db";
import { queryBuilder } from "../helpers/queryBuilder";

export interface IQueryURL {
  month: string;
  year: string;
  page_size: string;
  current: string;
  driver_code: string;
  status: "PENDING" | "CONFIRMED" | "PAID";
  name: string;
}

export async function getSalary(req: Request, res: Response) {
  const { current = 1, page_size = 10 } = req.query as unknown as IQueryURL;
  const queryConfig: Array<string | number> = [];
  try {
    const configData = await pool.query(`
        SELECT * FROM "variable_configs"
      `);
    queryConfig.push(configData.rows[0].value);

    const { query, queryCount, configCount } = queryBuilder(
      req.query as unknown as IQueryURL,
      queryConfig
    );

    const [count, result] = await Promise.all([
      await pool.query(`SELECT COUNT(*) FROM (${queryCount})`, configCount),
      await pool.query(query, queryConfig),
    ]);

    res.status(200).send({
      data: result.rows,
      total_row: Number(count.rows[0].count),
      current: Number(current),
      page_size: Number(page_size),
    });
  } catch (error) {
    res.status(400).send({ error });
  }
}
