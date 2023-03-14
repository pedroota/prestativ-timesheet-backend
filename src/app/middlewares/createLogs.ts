import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
const UserRepository = require("../repositories/UserRepository");
import jwt from "jsonwebtoken";
const LogRepository = require("../repositories/LogRepository");

interface DecodedTokenTypes {
  id: string;
  role: string;
}

export async function createLogs(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Validates if the user send a token to the logs creation
  if (!token)
    return response
      .status(400)
      .json({ message: "Não foi enviado um token para criação de logs" });

  // Decodes the token and sees who made the request
  try {
    const { JWT_SECRET } = process.env;
    const { id, role } = jwt.verify(token, JWT_SECRET) as DecodedTokenTypes;
    const { name, surname } = await UserRepository.findById(id);
    await LogRepository.create({
      name,
      surname,
      role,
      action: `${request.method} ${request.url}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  } catch {
    return response.status(500).json({
      message: "Ocorreu um erro ao criar o LOG de acordo com o token fornecido",
    });
  }

  return next();
}
