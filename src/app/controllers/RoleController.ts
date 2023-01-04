import { Request, Response } from "express";
const RoleRepository = require("../repositories/RoleRepository");

class RoleController {
  async index(request: Request, response: Response) {
    const roles = await RoleRepository.findAll();

    return response.json(roles);
  }

  // show(request: Request, response: Response) {}

  async store(request: Request, response: Response) {
    const { name } = request.body;

    const isRoleAlreadyRegistered = await RoleRepository.findByName(name);

    if (isRoleAlreadyRegistered)
      return response.status(422).json({
        message: "Um tipo de usuário já foi cadastrado com este nome",
      });

    const role = await RoleRepository.create({
      name,
    });

    return response.status(200).json(role);
  }

  async update(request: Request, response: Response) {
    const id = request.params.id;
    const { name } = request.body;
    const role = { name };
    const updatedRole = await RoleRepository.updateOne({ _id: id }, role);
    if (updatedRole.matchedCount === 0) {
      response.status(422).json({
        error: "é obrigatório informar um novo nome para o tipo de usuário",
      });
      return;
    }
    response.status(200).json(role);
  }

  async delete(request: Request, response: Response) {
    const id = request.params.id;
    const role = await RoleRepository.findOne({ _id: id });
    if (!role) {
      response
        .status(422)
        .json({ message: "o tipo de usuário não foi encontrada!" });
      return;
    }
    await RoleRepository.deleteOne({ _id: id });
    response
      .status(200)
      .json({ message: "esse tipo usuário foi removido com sucesso" });
  }
}

module.exports = new RoleController();
