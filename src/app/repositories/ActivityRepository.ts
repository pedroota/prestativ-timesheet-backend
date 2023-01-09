const Activity = require("../models/ActivitySchema");

class ActivityRepository {
  async findAll() {
    const activities = await Activity.find();

    return activities;
  }

  async findByName(name: string) {
    const activity = Activity.findOne({ name: name });

    return activity;
  }

  async create({
    title,
    project,
    valueActivity,
    gpActivity,
    description,
    userString,
    createdAt,
    updatedAt,
  }) {
    const activity = new Activity({
      title,
      project,
      valueActivity,
      gpActivity,
      description,
      userString,
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
    userString,
  }) {
    const activity = await Activity.findOneAndUpdate(
      { _id: id },
      {
        title: title,
        project: project,
        valueActivity: valueActivity,
        gpActivity: gpActivity,
        description: description,
        userString: userString,
        updatedAt: Date.now(),
      }
    );
    return activity;
  }

  async findById(id: string) {
    const activity = await Activity.findOne({ _id: id });

    return activity;
  }

  async delete(id: string) {
    await Activity.findOneAndDelete({ _id: id });
    return;
  }
}

module.exports = new ActivityRepository();
