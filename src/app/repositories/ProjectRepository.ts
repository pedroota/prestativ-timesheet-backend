const Project = require("../models/ProjectSchema");

class ProjectRepository {
  async findAll() {
    const projects = await Project.find()
      .populate([
        { path: "idClient", select: "_id name" },
        { path: "gpProject", select: "_id name surname" },
      ])
      .lean()
      .exec();

    return projects;
  }

  async findClientIdByProjectId(id: string) {
    const project = await Project.findOne({ _id: id })
      .populate("idClient")
      .lean()
      .exec();

    return project.idClient._id;
  }

  async findSome(startIndex) {
    const projects = await Project.find()
      .limit(10)
      .skip(startIndex)
      .populate([
        { path: "idClient", select: "_id name" },
        { path: "gpProject", select: "_id name surname" },
      ])
      .lean()
      .exec();

    return projects;
  }

  async findByName(name: string) {
    const project = Project.findOne({ name: name })
      .populate("activities")
      .lean()
      .exec();

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
    activities,
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
        activities,
      }
    )
      .populate("activities")
      .lean()
      .exec();
    return project;
  }

  async findById(id: string) {
    const project = await Project.findOne({ _id: id })
      .populate("activities")
      .lean()
      .exec();

    return project;
  }

  async delete(id: string) {
    await Project.findOneAndDelete({ _id: id });
    return;
  }
}

module.exports = new ProjectRepository();
