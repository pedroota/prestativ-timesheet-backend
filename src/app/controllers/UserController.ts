import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
const UserRepository = require("../repositories/UserRepository");
const RoleRepository = require("../repositories/RoleRepository");
const mailer = require("../modules/mailer");

class UsersController {
  async index(request: Request, response: Response) {
    const { role } = request.query;
    if (role) {
      const users = await UserRepository.findUsersByRole(role);
      return response.json(users);
    }
    const users = await UserRepository.findAll();
    return response.json(users);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const user = await UserRepository.findById(id);

    if (!user)
      return response
        .status(400)
        .json({ message: "Nenhum usuário encontrado." });

    return response
      .status(200)
      .json({ message: "Usuário encontrado com sucesso", user });
  }

  async register(request: Request, response: Response) {
    const { name, surname, email, password, role } = request.body;

    // Search if the user already exists
    const isUserAlreadyRegistered = await UserRepository.findByEmail(email);
    const isRoleValid = await RoleRepository.findByName(role);
    console.log(name, surname, email, password, role);

    if (isUserAlreadyRegistered)
      return response
        .status(422)
        .json({ message: "Esse usuário já foi cadastrado" });

    if (!isRoleValid)
      return response
        .status(404)
        .json({ message: "O cargo definido é inválido." });

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await UserRepository.create({
      name,
      surname,
      email,
      password: passwordHash,
      role,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return response
      .status(200)
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
          role: user.role,
        },
        JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      response
        .status(200)
        .cookie("token", token, { httpOnly: true })
        .json({ message: "Usuário logado com sucesso", token });
    } catch (err) {
      response.send(500).json("Ops! Algo deu errado.");
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, surname, email, password, role } = request.body;

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const updatedUser = await UserRepository.findByIdAndUpdate({
      id,
      name,
      surname,
      email,
      passwordHash,
      role,
    });

    return response
      .status(200)
      .json({ message: "Usuário atualizado com sucesso.", updatedUser });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const user = await UserRepository.findById(id);

    if (!user)
      return response
        .status(404)
        .json({ message: "Este usuário não foi encontrado." });

    await UserRepository.delete(id);

    return response
      .status(204)
      .json({ message: "Usuário deletado com sucesso." });
  }

  async forgot(request: Request, response: Response) {
    const { email } = request.body;

    try {
      const user = await UserRepository.findByEmail(email);

      if (!user) {
        response.status(400).send({ error: "Usuário não encontrado" });
      }
      const token = crypto.randomBytes(20).toString("hex");

      const now = new Date();
      now.setHours(now.getHours() + 1);

      const idUser = user.id;

      await UserRepository.findByIdAndUpdateToken({
        idUser,
        token,
        now,
      });
      mailer.sendMail(
        {
          to: "filipebacof@gmail.com",
          from: "'Timesheet Prestativ' <filipebacof@gmail.com>",
          subject: "Token para resetar a senha",
          html: `<h1>Recuperação de Senha Timesheet Prestativ</h1> <p>Para redefinir sua senha, utilize este token: ${token}</p>`,
        },
        (err) => {
          if (err)
            return response
              .status(400)
              .send({ error: "Não foi enviado o email com o token", err });

          return response.send();
        }
      );
    } catch (err) {
      console.log(err);
      response
        .status(400)
        .send({ error: "Erro ao tentar recuperar a senha, tente novamente!" });
    }
  }

  async newPass(request: Request, response: Response) {
    const { email, token, password } = request.body;

    try {
      const user = await UserRepository.findByEmail(email);

      if (!user) {
        response.status(400).send({ error: "Usuário não encontrado" });
      }

      if (user.passwordResetToken !== token)
        response
          .status(400)
          .send({ error: "O token informado está incorreto" });

      const now = new Date();
      if (user.passwordResetExpires < now)
        response
          .status(400)
          .send({ error: "O token informado expirou, tente gerar novamente." });

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      await UserRepository.findByEmailAndUpdatePassword({
        email,
        passwordHash,
        now,
      });
    } catch (err) {
      console.log(err);
      response
        .status(400)
        .send({ error: "Erro ao tentar recuperar a senha, tente novamente!" });
    }
  }
}

module.exports = new UsersController();
