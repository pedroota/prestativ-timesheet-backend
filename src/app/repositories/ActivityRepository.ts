const Activity = require("../models/ActivitySchema");

class ActivityRepository {
  async findAll() {
    const activities = await Activity.find()
      .populate([
        { path: "project", select: "_id title idClient" },
        { path: "gpActivity", select: "_id name surname" },
        { path: "users", select: "_id name surname" },
      ])
      .lean()
      .exec();

    return activities;
  }

  async findSome(startIndex) {
    const activities = await Activity.find()
      .limit(10)
      .skip(startIndex)
      .populate([
        { path: "project", select: "_id title idClient" },
        { path: "gpActivity", select: "_id name surname" },
        { path: "users", select: "_id name surname" },
      ])
      .lean()
      .exec();

    return activities;
  }

  async findByName(title: string) {
    const activity = Activity.findOne({ title: title })
      .populate([
        { path: "project", select: "_id title idClient" },
        { path: "gpActivity", select: "_id name surname" },
        { path: "users", select: "_id name surname" },
      ])
      .lean()
      .exec();

    return activity;
  }

  async create({
    title,
    project,
    valueActivity,
    gpActivity,
    description,
    users,
    closedScope,
    createdAt,
    updatedAt,
  }) {
    const activity = new Activity({
      title,
      project,
      valueActivity,
      gpActivity,
      description,
      users,
      closedScope,
      createdAt,
      updatedAt,
    });

    await activity.save();

    return activity;
  }
  async findByIdAndUpdate({
    id,
    title,
    project,
    valueActivity,
    gpActivity,
    description,
    users,
    closedScope,
  }) {
    const activity = await Activity.findOneAndUpdate(
      { _id: id },
      {
        title: title,
        project: project,
        valueActivity: valueActivity,
        gpActivity: gpActivity,
        description: description,
        users: users,
        updatedAt: Date.now(),
        closedScope: closedScope,
      }
    )
      .populate([
        { path: "project", select: "_id title idClient" },
        { path: "gpActivity", select: "_id name surname" },
        { path: "users", select: "_id name surname" },
      ])
      .lean()
      .exec();

    return activity;
  }

  async findById(id: string) {
    const activity = await Activity.findOne({ _id: id })
      .populate("users")
      .lean()
      .exec();

    return activity;
  }

  async findByIdAndCheck({ id, value }) {
    const activity = await Activity.findOneAndUpdate(
      { _id: id },
      {
        updatedAt: Date.now(),
        closedScope: value,
      }
    )
      .populate([
        { path: "project", select: "_id title idClient" },
        { path: "gpActivity", select: "_id name surname" },
        { path: "users", select: "_id name surname" },
      ])
      .lean()
      .exec();

    return activity;
  }

  async delete(id: string) {
    await Activity.findOneAndDelete({ _id: id });
    return;
  }
}

module.exports = new ActivityRepository();
