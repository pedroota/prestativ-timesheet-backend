import { Request, Response } from "express";
const ProjectRepository = require("../repositories/ProjectRepository");
const Client = require("../models/ClientSchema");

class ProjectController {
  async index(_request: Request, response: Response) {
    const projects = await ProjectRepository.findAll();

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

    // Populate the projects property inside the Client Schema with the actual id from the project
    const client = await Client.findById(idClient);
    if (!client)
      return response
        .status(404)
        .json({ message: "O cliente especificado não foi encontrado" });
    client.projects.push(project._id);
    client.save();

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
