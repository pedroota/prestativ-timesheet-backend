import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const UserRepository = require("../repositories/UserRepository");

class UsersController {
  async index(request: Request, response: Response) {
    const users = await UserRepository.findAll();

    return response.json(users);
  }

  async register(request: Request, response: Response) {
    const { name, surname, email, password } = request.body;

    // Search if the user already exists
    const isUserAlreadyRegistered = await UserRepository.findByEmail(email);

    if (isUserAlreadyRegistered)
      return response
        .status(422)
        .json({ message: "Esse usuário já foi cadastrado" });

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await UserRepository.create({
      name,
      surname,
      email,
      password: passwordHash,
    });

    return response
      .status(204)
      .json({ message: "Usuário criado com sucesso", user });
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    // Search if the user exists
    const user = await UserRepository.findByEmail(email);

    if (!user)
      return response.status(404).json({ message: "Usuário não encontrado" });

    // Verify if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return response
        .status(422)
        .json({ message: "E-mail ou senha podem estar errados." });

    try {
      const { JWT_SECRET } = process.env;
      const token = jwt.sign(
        {
          id: user._id,
        },
        JWT_SECRET
      );

      response
        .status(200)
        .json({ message: "Usuário logado com sucesso", token });
    } catch (err) {
      response.send(500).json("Ops! Algo deu errado.");
    }
  }
}

module.exports = new UsersController();