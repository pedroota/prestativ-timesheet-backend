import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export function errorHandler(
  error: ErrorRequestHandler,
  request: Request,
  response: Response
) {
  console.log(error);

  return response.sendStatus(500);
}
