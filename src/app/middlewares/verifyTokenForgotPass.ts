import { Request, Response, NextFunction } from "express";
const UserRepository = require("../repositories/UserRepository");

export async function verifyTokenForgotPass(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { email, password, token } = request.body;

  if (!token)
    return response
      .status(401)
      .json({ message: "O campo do Token não pode estar vazio" });
  if (!email)
    return response
      .status(401)
      .json({ message: "O campo do E-mail não pode estar vazio." });
  if (!password)
    return response
      .status(401)
      .json({ message: "Os campos de senha não podem estar vazios" });
  try {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      response.status(400).send({ error: "Usuário não encontrado" });
    }
    if (user.passwordResetToken !== token)
      response.status(400).send({ error: "O token informado está incorreto" });

    if (user.passwordResetExpires < new Date())
      response
        .status(400)
        .send({ error: "O token informado expirou, tente gerar novamente." });

    next();
  } catch (err) {
    response.status(400).json({ message: "Este token é inválido!" });
  }
}
