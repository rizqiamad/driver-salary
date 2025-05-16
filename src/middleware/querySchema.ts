import { query } from "express-validator";

export const querySchema = [
  query("month")
    .optional()
    .isInt({ min: 1, max: 12 })
    .withMessage("Month must be between 1 and 12"),

  query("year")
    .optional()
    .isInt({ min: 2000, max: 2100 })
    .withMessage("Year must be between 2000 and 2100"),

  query("page_size")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page size must be a positive integer"),

  query("current")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Current page must be a positive integer"),

  query("status")
    .optional()
    .isIn(["PENDING", "CONFIRMED", "PAID"])
    .withMessage("Invalid status value"),

  query("driver_code")
    .optional()
    .isString()
    .withMessage("Driver code must be a string"),

  query("name").optional().isString().withMessage("Name must be a string"),
];
