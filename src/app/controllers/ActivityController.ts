import { Request, Response } from "express";
const ActivityRepository = require("../repositories/ActivityRepository");

class ActivityController {
  async index(request: Request, response: Response) {
    const activities = await ActivityRepository.findAll();

    return response.json(activities);
  }

  // show(request: Request, response: Response) {}

  async store(request: Request, response: Response) {
    const { title, project, valueActivity, gpActivity, callNumber } =
      request.body;

    const isActivityAlreadyRegistered = await ActivityRepository.findByName(
      title
    );

    if (isActivityAlreadyRegistered)
      return response
        .status(422)
        .json({ message: "Uma atividade com este nome já foi cadastrado" });

    const activity = await ActivityRepository.create({
      title,
      project,
      valueActivity,
      gpActivity,
      callNumber,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return response.status(200).json(activity);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { title, project, valueActivity, gpActivity, callNumber } =
      request.body;

    const updatedActivity = await ActivityRepository.findByIdAndUpdate({
      id,
      title,
      project,
      valueActivity,
      gpActivity,
      callNumber,
    });

    return response
      .status(200)
      .json({ message: "Atividade atualizada com sucesso.", updatedActivity });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const activity = await ActivityRepository.findById(id);

    if (!activity)
      return response
        .status(404)
        .json({ message: "Esta atividade não foi encontrada." });

    await ActivityRepository.delete(id);

    return response
      .status(204)
      .json({ message: "Atividade deletada com sucesso." });
  }
}

module.exports = new ActivityController();
