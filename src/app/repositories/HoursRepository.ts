const Hours = require("../models/HoursSchema");

class HoursRepository {
  async findAll() {
    const hours = await Hours.find()
      .populate([
        { path: "relUser", select: "_id name surname" },
        { path: "relClient", select: "_id name" },
        { path: "relProject", select: "_id title" },
        { path: "relActivity", select: "_id title" },
      ])
      .lean()
      .exec();

    return hours;
  }

  async findById(id: string) {
    const hours = Hours.findOne({ _id: id })
      .populate([
        { path: "relUser", select: "_id name" },
        { path: "relClient", select: "_id name" },
        { path: "relProject", select: "_id title" },
        { path: "relActivity", select: "_id title" },
      ])
      .lean()
      .exec();

    return hours;
  }

  async create({
    initial,
    final,
    adjustment,
    relClient,
    relProject,
    relActivity,
    relUser,
    activityDesc,
    createdAt,
    updatedAt,
  }) {
    const hours = new Hours({
      initial,
      final,
      adjustment,
      relClient,
      relProject,
      relActivity,
      relUser,
      activityDesc,
      createdAt,
      updatedAt,
    });

    await hours.save();

    return hours;
  }
  async findByIdAndUpdate({
    id,
    initial,
    final,
    adjustment,
    relClient,
    relProject,
    relActivity,
    relUser,
    approvedGP,
    billable,
    released,
    approved,
    activityDesc,
  }) {
    const hours = await Hours.findOneAndUpdate(
      { _id: id },
      {
        initial: initial,
        final: final,
        adjustment: adjustment,
        relClient: relClient,
        relProject: relProject,
        relActivity: relActivity,
        relUser: relUser,
        approvedGP: approvedGP,
        billable: billable,
        released: released,
        approved: approved,
        activityDesc: activityDesc,
        updatedAt: Date.now(),
      }
    )
      .populate([
        { path: "relUser", select: "_id name" },
        { path: "relClient", select: "_id name" },
        { path: "relProject", select: "_id title" },
        { path: "relActivity", select: "_id title" },
      ])
      .lean()
      .exec();

    return hours;
  }

  async delete(id: string) {
    await Hours.findOneAndDelete({ _id: id });
    return;
  }
}

module.exports = new HoursRepository();
