import { NextFunction, Request, Response } from "express";
import { FieldValidationError, validationResult } from "express-validator";

export function validateQuery(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({
      errors: (errors.array() as FieldValidationError[]).map((err) => ({
        path: err.path,
        message: err.msg,
      })),
    });
    return;
  }
  next();
}
