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
    const { name, surname, email, password, role, typeField, activities } =
      request.body;

    // Search if the user already exists
    const isUserAlreadyRegistered = await UserRepository.findByEmail(email);

    // Search if the given role is valid
    const isRoleValid = await RoleRepository.findById(role);

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
      typeField,
      activities,
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
        .json({ message: "E-mail ou senha podem estar incorretos." });

    try {
      const { JWT_SECRET } = process.env;
      const token = jwt.sign(
        {
          id: user._id,
        },
        JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      const { _id, name, surname, email, role } = user;

      response.status(200).cookie("token", token, { httpOnly: true }).json({
        message: "Usuário logado com sucesso",
        user: {
          _id,
          name,
          surname,
          email,
          role,
        },
        token,
      });
    } catch (err) {
      response.send(500).json("Ops! Algo deu errado.");
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, surname, email, password, role, typeField, activities } =
      request.body;

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const updatedUser = await UserRepository.findByIdAndUpdate({
      id,
      name,
      surname,
      email,
      password: passwordHash,
      role,
      typeField,
      activities,
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
        response.status(400).json({ message: "Usuário não encontrado" });
      }
      const token = crypto.randomBytes(20).toString("hex");

      await UserRepository.findByEmailAndUpdateToken({
        email,
        token,
      });

      mailer.sendMail(
        {
          // coloque seu email aqui para testar, mas por padrão é a variavel "email"
          to: email,
          from: "'Timesheet Prestativ' <filipebacof@gmail.com>",
          subject: "Token para resetar a senha",
          html: `<h1>Recuperação de Senha Timesheet Prestativ</h1> <p>Para redefinir sua senha, utilize este token: ${token}</p>`,
        },
        (err) => {
          if (err)
            return response
              .status(400)
              .json({ message: "Não foi enviado o email com o token", err });

          return response.status(204).json({ message: "Email Enviado" });
        }
      );
    } catch (err) {
      console.log(err);
      response.status(400).json({
        message: "Erro ao tentar recuperar a senha, tente novamente!",
      });
    }
  }

  async newPass(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const user = await UserRepository.findByEmail(email);

      if (!user) {
        response.status(400).json({ message: "Usuário não encontrado" });
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      await UserRepository.findByEmailAndUpdatePassword({
        email,
        password: passwordHash,
      });

      return response.status(204).json({ message: "Senha atualizada." });
    } catch (err) {
      console.log(err);
      response.status(400).json({
        message: "Erro ao tentar recuperar a senha, tente novamente!",
      });
    }
  }
}

module.exports = new UsersController();
