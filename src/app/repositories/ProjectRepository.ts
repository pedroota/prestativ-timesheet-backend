const Project = require("../models/ProjectSchema");

class ProjectRepository {
  async findAll() {
    const projects = await Project.find();

    return projects;
  }

  async findByName(name: string) {
    const project = Project.findOne({ name: name });

    return project;
  }

  async create({
    title,
    idClient,
    valueProject,
    gpProject,
    description,
    createdAt,
    updatedAt,
  }) {
    const project = new Project({
      title,
      idClient,
      valueProject,
      gpProject,
      description,
      createdAt,
      updatedAt,
    });

    await project.save();

    return project;
  }
  async findByIdAndUpdate({
    id,
    title,
    idClient,
    valueProject,
    gpProject,
    description,
  }) {
    const project = await Project.findOneAndUpdate(
      { _id: id },
      {
        title: title,
        idClient: idClient,
        valueProject: valueProject,
        gpProject: gpProject,
        description: description,
        updatedAt: Date.now(),
      }
    );
    return project;
  }

  async findById(id: string) {
    const project = await Project.findOne({ _id: id });

    return project;
  }

  async findAllProjectsByClient(idClient: string) {
    const projects = await Project.find({ idClient: idClient });

    return projects;
  }

  async delete(id: string) {
    await Project.findOneAndDelete({ _id: id });
    return;
  }
}

module.exports = new ProjectRepository();
