import { Router } from "express";
import { getSalary } from "../controllers/salary.controller";
import { querySchema } from "../middleware/querySchema";
import { validateQuery } from "../middleware/validateQuery";

const router = Router();

router.get("/driver/list", querySchema, validateQuery, getSalary);

export default router;
