import { Request, Response } from "express";
const ProjectRepository = require("../repositories/ProjectRepository");

class ProjectController {
  async index(_request: Request, response: Response) {
    const projects = await ProjectRepository.findAll();

    return response.json(projects);
  }

  async findByClient(request: Request, response: Response) {
    const { idClient } = request.params;

    const projects = await ProjectRepository.findAllProjectsByClient(idClient);

    return response.json(projects);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const project = await ProjectRepository.findById(id);

    if (!project)
      return response
        .status(400)
        .json({ message: "Nenhum projeto encontrado." });

    return response
      .status(200)
      .json({ message: "Projeto encontrado com sucesso", project });
  }

  async store(request: Request, response: Response) {
    const { title, idClient, valueProject, gpProject, description } =
      request.body;

    const isProjectAlreadyRegistered = await ProjectRepository.findByName(
      title
    );

    if (isProjectAlreadyRegistered)
      return response
        .status(422)
        .json({ message: "Um projeto com este nome já foi cadastrado" });

    const project = await ProjectRepository.create({
      title,
      idClient,
      valueProject,
      gpProject,
      description,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return response.status(200).json(project);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { title, idClient, valueProject, gpProject, description } =
      request.body;

    const updatedProject = await ProjectRepository.findByIdAndUpdate({
      id,
      title,
      idClient,
      valueProject,
      gpProject,
      description,
    });

    return response
      .status(200)
      .json({ message: "Projeto atualizado com sucesso.", updatedProject });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const project = await ProjectRepository.findById(id);

    if (!project)
      return response
        .status(404)
        .json({ message: "Este projeto não foi encontrado." });

    await ProjectRepository.delete(id);

    return response
      .status(204)
      .json({ message: "Projeto deletado com sucesso." });
  }
}

module.exports = new ProjectController();
