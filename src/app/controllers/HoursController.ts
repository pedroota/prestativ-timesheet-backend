import { Request, Response } from "express";
const HoursRepository = require("../repositories/HoursRepository");

class HoursController {
  async index(request: Request, response: Response) {
    const page = Number(request.query.page);

    if (page) {
      const startIndex = (page - 1) * 10;
      const hours = await HoursRepository.findSome(startIndex);
      return response.json(hours);
    }

    const hours = await HoursRepository.findAll();

    return response.json(hours);
  }

  async latest(_request: Request, response: Response) {
    const today = new Date();
    today.setMonth(-1);
    const timestamp = today.getTime();

    const hours = await HoursRepository.findLatest(timestamp);

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

  async check(request: Request, response: Response) {
    const { id } = request.params;
    const { field, value } = request.body;

    const updatedHours = await HoursRepository.findByIdAndCheck({
      id,
      field,
      value,
    });

    return response.status(200).json({
      message: `O campo ${field} foi marcado como ${value}`,
    });
  }
}

module.exports = new HoursController();
