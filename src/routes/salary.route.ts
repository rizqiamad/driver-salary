import { Router } from "express";
import { getSalary } from "../controllers/salary.controller";

const router = Router();

router.get("/driver/list", getSalary);

export default router;
