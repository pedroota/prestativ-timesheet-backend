import { Request, Response } from "express";
import { Permission } from "../enum/Permissions";
const RoleRepository = require("../repositories/RoleRepository");

class RoleController {
  async index(request: Request, response: Response) {
    const roles = await RoleRepository.findAll();

    return response.json(roles);
  }

  // show(request: Request, response: Response) {}

  async store(request: Request, response: Response) {
    const { name, permissions } = request.body;
    const isRoleAlreadyRegistered = await RoleRepository.findByName(name);

    if (!name || !permissions)
      return response
        .status(400)
        .json({ message: "Campos faltando no cadastro de cargos" });

    /**
     * Validates if the user has sent the correct permissions.
     * If you want to add more permissions to the app, please, change it at enum/Permissions.ts
     * and add the validations at your frontend code
     */
    const isPermissionsValid = permissions.every((permission) =>
      Object.values(Permission).includes(permission)
    );

    if (!isPermissionsValid) {
      return response
        .status(400)
        .json({ message: "As permissões cadastradas estão incorretas." });
    }

    // Verify if a role is already registered
    if (isRoleAlreadyRegistered)
      return response.status(422).json({
        message: "Um cargo com este nome já foi cadastrado.",
      });

    const role = await RoleRepository.create({ name, permissions });

    return response.status(200).json(role);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name } = request.body;

    if (!name)
      return response
        .status(404)
        .json({ message: "O campo de nome é obrigatório." });

    const updatedRole = await RoleRepository.findByIdAndUpdate({ id, name });

    return response
      .status(200)
      .json({ message: "Cargo atualizado com sucesso.", updatedRole });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const role = await RoleRepository.findById(id);

    if (!role)
      return response
        .status(404)
        .json({ message: "Este cargo não foi encontrado." });

    await RoleRepository.delete(id);

    return response.status(204).json({ message: "Cargo apagado com sucesso." });
  }
}

module.exports = new RoleController();
