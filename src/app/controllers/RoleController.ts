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
        message: "Uma categoria de usuário com este nome já foi cadastrado",
      });

    const role = await RoleRepository.create({
      name,
    });

    return response.status(200).json(role);
  }

  // update(request: Request, response: Response) {}

  // delete(request: Request, response: Response) {}
}

module.exports = new RoleController();
