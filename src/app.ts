import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import salaryRouter from "./routes/salary.route";

const app: Application = express();
const PORT: number = 8000;

app.use(express.json());
app.use("/v1/salary", salaryRouter);

app.listen(PORT, () =>
  console.log(`Server is running on --> http://localhost:${PORT}/v1`)
);
