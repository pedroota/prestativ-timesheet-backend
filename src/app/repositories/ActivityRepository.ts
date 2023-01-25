const Activity = require("../models/ActivitySchema");

class ActivityRepository {
  async findAll() {
    const activities = await Activity.find()
      .populate([
        { path: "project", select: "_id title" },
        { path: "gpActivity", select: "_id name surname" },
      ])
      .lean()
      .exec();

    return activities;
  }

  async findByName(title: string) {
    const activity = Activity.findOne({ title: title })
      .populate("users")
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
      .populate("users")
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

  async delete(id: string) {
    await Activity.findOneAndDelete({ _id: id });
    return;
  }
}

module.exports = new ActivityRepository();
