import { Request, Response, ErrorRequestHandler } from "express";

export function errorHandler(
  error: ErrorRequestHandler,
  request: Request,
  response: Response
) {
  console.log(error);

  return response
    .status(500)
    .json({ message: "Ops! Ocorreu um erro ao executar a ação." });
}
