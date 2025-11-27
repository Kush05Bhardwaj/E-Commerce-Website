import { logger } from "@utils/logger";
import type { NextFunction, Request, Response } from "express";

export class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (err: Error | ApiError, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || "Something went wrong";
  if (statusCode >= 500) {
    logger.error({ err }, "Unhandled error");
  }
  res.status(statusCode).json({ message });
};

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
};

