import { Request, Response } from "express";
const ActivityRepository = require("../repositories/ActivityRepository");
const User = require("../models/UserSchema");
const Project = require("../models/ProjectSchema");

class ActivityController {
  async index(request: Request, response: Response) {
    const page = Number(request.query.page);

    if (page) {
      const startIndex = (page - 1) * 10;
      const activities = await ActivityRepository.findSome(startIndex);
      return response.json(activities);
    }

    const activities = await ActivityRepository.findAll();

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

  async active(_request: Request, response: Response) {
    const activity = await ActivityRepository.findActive();

    if (!activity)
      return response
        .status(400)
        .json({ message: "Nenhuma atividade ativa encontrada." });

    if (activity.length === 0)
      return response
        .status(200)
        .json({ message: "Nenhuma atividade ativa encontrada." });

    return response.status(200).json({
      message: `${activity.length} Atividade${
        activity.length > 1 ? "s" : ""
      } ativa${activity.length > 1 ? "s" : ""} encontrada${
        activity.length > 1 ? "s" : ""
      }`,
      activity,
    });
  }

  async store(request: Request, response: Response) {
    const {
      title,
      project,
      valueActivity,
      gpActivity,
      description,
      users,
      closedScope,
    } = request.body;
    let { activityValidity } = request.body;

    const isActivityAlreadyRegistered = await ActivityRepository.findByName(
      title
    );

    if (isActivityAlreadyRegistered)
      return response
        .status(422)
        .json({ message: "Uma atividade com este nome já foi cadastrado" });

    if (!activityValidity) {
      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      activityValidity = date.getTime();
    }

    const activity = await ActivityRepository.create({
      title,
      project,
      valueActivity,
      gpActivity,
      description,
      users,
      closedScope,
      activityValidity,
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

    // Populate the activities property inside the Project Schema with the actual id from the activity
    const actualProject = await Project.findById(project);
    if (!actualProject)
      return response
        .status(404)
        .json({ message: "O projeto especificado não foi encontrado" });
    actualProject.activities.push(activity._id);
    actualProject.save();

    return response.status(200).json(activity);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
      title,
      project,
      valueActivity,
      gpActivity,
      description,
      users,
      closedScope,
      activityValidity,
    } = request.body;

    const updatedActivity = await ActivityRepository.findByIdAndUpdate({
      id,
      title,
      project,
      valueActivity,
      gpActivity,
      description,
      users,
      closedScope,
      activityValidity,
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

  async check(request: Request, response: Response) {
    const { id } = request.params;
    const { value } = request.body;

    await ActivityRepository.findByIdAndCheck({
      id,
      value,
    });

    return response.status(200).json({
      message: `Escopo Fechado foi marcado como ${value}`,
    });
  }
}

module.exports = new ActivityController();
