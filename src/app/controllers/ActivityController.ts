import { Request, Response } from "express";
const ActivityRepository = require("../repositories/ActivityRepository");
const User = require("../models/UserSchema");

class ActivityController {
  async index(_request: Request, response: Response) {
    const activities = await ActivityRepository.findAll();

    return response.json(activities);
  }

  async findByProject(request: Request, response: Response) {
    const { project } = request.params;

    const activities = await ActivityRepository.findAllActivitiesByProject(
      project
    );

    return response.json(activities);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const activity = await ActivityRepository.findById(id);

    if (!activity)
      return response
        .status(400)
        .json({ message: "Nenhuma atividade encontrada." });

    return response
      .status(200)
      .json({ message: "Atividade encontrada com sucesso", activity });
  }

  async store(request: Request, response: Response) {
    const { title, project, valueActivity, gpActivity, description, users } =
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
      description,
      users,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await activity.save();

    // Populate the activities property inside the User Schema with the actual id from the activity
    for (const key in users) {
      const user = await User.findById(users[key]);
      if (!user)
        return response
          .status(400)
          .json({ message: "O usuário especificado não foi encontrado." });
      user.activities.push(activity._id);
      user.save();
    }

    return response.status(200).json(activity);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { title, project, valueActivity, gpActivity, description, users } =
      request.body;

    const updatedActivity = await ActivityRepository.findByIdAndUpdate({
      id,
      title,
      project,
      valueActivity,
      gpActivity,
      description,
      users,
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
