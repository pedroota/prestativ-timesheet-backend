import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyTokenJwt(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return response.status(401).json({ message: "Acesso negado!" });

  try {
    const { JWT_SECRET } = process.env;

    jwt.verify(token, JWT_SECRET);

    next();
  } catch (err) {
    response.status(400).json({ message: "Este token é inválido!" });
  }
}
