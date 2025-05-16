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

export async function getSalary(
  req: Request<{}, {}, {}, IQueryURL>,
  res: Response
) {
  const { current, page_size } = req.query;
  const queryConfig: Array<string | number> = [];
  try {
    const configData = await pool.query(`
        SELECT * FROM "variable_configs"
      `);
    queryConfig.push(configData.rows[0].value);

    const query: string = queryBuilder(req.query, queryConfig);

    const result = await pool.query(query, queryConfig);

    res.status(200).send({
      data: result.rows,
      total_row: result.rowCount,
      current: current && page_size && Number(current),
      page_size: page_size && Number(page_size),
    });
  } catch (error) {
    res.status(400).send({ error });
  }
}
