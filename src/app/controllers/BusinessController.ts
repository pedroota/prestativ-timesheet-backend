import { Request, Response } from "express";
const BusinessRepository = require("../repositories/BusinessRepository");

class BusinessController {
  async index(_request: Request, response: Response) {
    const businessUnit = await BusinessRepository.findAll();

    return response.json(businessUnit);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const businessUnit = await BusinessRepository.findById(id);

    if (!businessUnit)
      return response.status(400).json({ message: "Nenhum B.U. encontrado." });

    return response
      .status(200)
      .json({ message: "B.U. encontrado com sucesso", businessUnit });
  }

  async store(request: Request, response: Response) {
    const { nameBU, relUser } = request.body;

    const buAlreadyRegistered = await BusinessRepository.findByName(nameBU);

    if (buAlreadyRegistered)
      return response
        .status(422)
        .json({ message: "Um B.U. com este nome já foi cadastrado" });

    const businessUnit = await BusinessRepository.create({
      nameBU,
      relUser,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return response.status(200).json(businessUnit);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nameBU, relUser } = request.body;

    const updatedBusinessUnit = await BusinessRepository.findByIdAndUpdate({
      id,
      nameBU,
      relUser,
    });

    return response.status(200).json({
      message: "B.U. atualizado com sucesso.",
      updatedBusinessUnit,
    });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const businessUnit = await BusinessRepository.findById(id);

    if (!businessUnit)
      return response
        .status(404)
        .json({ message: "Este B.U. não foi encontrado." });

    await BusinessRepository.delete(id);

    return response
      .status(204)
      .json({ message: "B.U. deletado com sucesso." });
  }
}

module.exports = new BusinessController();
