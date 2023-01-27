import { Request, Response } from "express";
const LogRepository = require("../repositories/LogRepository");

class LogController {
  async index(_request: Request, response: Response) {
    const logs = await LogRepository.findAll();

    return response.json(logs);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const log = await LogRepository.findById(id);

    if (!log)
      return response
        .status(400)
        .json({ message: "Nenhum log foi encontrado com este parâmetro." });

    return response
      .status(200)
      .json({ message: "Log encontrado com sucesso", log });
  }

  async store(request: Request, response: Response) {
    const { name, surname, role, action } = request.body;

    const log = await LogRepository.create({
      name,
      surname,
      role,
      action,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return response
      .status(200)
      .json({ message: "Log criado com sucesso", log });
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, role, action } = request.body;

    const updatedLog = await LogRepository.findByIdAndUpdate({
      id,
      name,
      role,
      action,
    });

    return response
      .status(200)
      .json({ message: "Log atualizado com sucesso", updatedLog });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const log = await LogRepository.findById(id);

    if (!log)
      return response
        .status(400)
        .json({ message: "Este log não foi encontrado" });

    await LogRepository.delete(id);

    return response.status(204).json({ message: "Log deletado com sucesso." });
  }
}

module.exports = new LogController();
