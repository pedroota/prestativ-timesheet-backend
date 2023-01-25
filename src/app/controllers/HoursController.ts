import { Request, Response } from "express";
const HoursRepository = require("../repositories/HoursRepository");

class HoursController {
  async index(_request: Request, response: Response) {
    const hours = await HoursRepository.findAll();

    return response.json(hours);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const hours = await HoursRepository.findById(id);

    if (!hours)
      return response
        .status(400)
        .json({ message: "Nenhum lançamento encontrado." });

    return response
      .status(200)
      .json({ message: "Lançamento encontrado com sucesso", hours });
  }

  async store(request: Request, response: Response) {
    const {
      initial,
      final,
      adjustment,
      relClient,
      relProject,
      relActivity,
      relUser,
      activityDesc,
    } = request.body;

    const hours = await HoursRepository.create({
      initial,
      final,
      adjustment,
      relClient,
      relProject,
      relActivity,
      relUser,
      activityDesc,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return response.status(200).json(hours);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
      initial,
      final,
      adjustment,
      relClient,
      relProject,
      relActivity,
      relUser,
      approvedGP,
      billable,
      released,
      approved,
      activityDesc,
    } = request.body;

    const updatedHours = await HoursRepository.findByIdAndUpdate({
      id,
      initial,
      final,
      adjustment,
      relClient,
      relProject,
      relActivity,
      relUser,
      approvedGP,
      billable,
      released,
      approved,
      activityDesc,
    });

    return response.status(200).json({
      message: "Este Lançamento de horas foi atualizado com sucesso.",
      updatedHours,
    });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const hours = await HoursRepository.findById(id);

    if (!hours)
      return response
        .status(404)
        .json({ message: "Este Lançamento de Horas não foi encontrado." });

    await HoursRepository.delete(id);

    return response
      .status(204)
      .json({ message: "Este Lançamento de Horas foi deletado com sucesso." });
  }
}

module.exports = new HoursController();
