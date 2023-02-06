const Hours = require("../models/HoursSchema");

class HoursRepository {
  async findAll() {
    const hours = await Hours.find()
      .populate([
        { path: "relUser", select: "_id name surname" },
        {
          path: "relClient",
          select: "_id name valueClient gpClient",
          populate: {
            path: "gpClient",
            select: "name",
          },
        },
        {
          path: "relProject",
          select: "_id title valueProject gpProject",
          populate: {
            path: "gpProject",
            select: "name",
          },
        },
        {
          path: "relActivity",
          select: "_id title valueActivity gpActivity closedScope",
          populate: {
            path: "gpActivity",
            select: "name",
          },
        },
      ])
      .lean()
      .exec();

    return hours;
  }

  async findWithFilters(filters) {
    // APIURL/hours/filter ? data = 2023-01-27 & relClient = 63d3ea3bbc9cf01242e73c50 & relProject = id & relActivity = id & relUser = id
    if (filters.data) {
      const dateFormated = filters.data.split("-");
      const timeINI = new Date(
        Number(dateFormated[0]),
        Number(dateFormated[1]) - 1,
        Number(dateFormated[2]),
        0,
        0,
        0,
        0
      ).getTime();
      const timeEND = new Date(
        Number(dateFormated[0]),
        Number(dateFormated[1]) - 1,
        Number(dateFormated[2]),
        23,
        59,
        59,
        999
      ).getTime();

      delete filters.data;

      if (Object.keys(filters).length === 0 || !filters) {
        const hours = await Hours.find({
          $and: [
            { initial: { $gte: timeINI } },
            { initial: { $lte: timeEND } },
          ],
        })
          .populate([
            { path: "relUser", select: "_id name surname" },
            {
              path: "relClient",
              select: "_id name valueClient gpClient",
              populate: {
                path: "gpClient",
                select: "name",
              },
            },
            {
              path: "relProject",
              select: "_id title valueProject gpProject",
              populate: {
                path: "gpProject",
                select: "name",
              },
            },
            {
              path: "relActivity",
              select: "_id title valueActivity gpActivity closedScope",
              populate: {
                path: "gpActivity",
                select: "name",
              },
            },
          ])
          .lean()
          .exec();

        return hours;
      } else {
        const hours = await Hours.find({
          $and: [{ initial: { $gt: timeINI } }, { final: { $lt: timeEND } }],
          ...filters,
        })
          .populate([
            { path: "relUser", select: "_id name surname" },
            {
              path: "relClient",
              select: "_id name valueClient gpClient",
              populate: {
                path: "gpClient",
                select: "name",
              },
            },
            {
              path: "relProject",
              select: "_id title valueProject gpProject",
              populate: {
                path: "gpProject",
                select: "name",
              },
            },
            {
              path: "relActivity",
              select: "_id title valueActivity gpActivity closedScope",
              populate: {
                path: "gpActivity",
                select: "name",
              },
            },
          ])
          .lean()
          .exec();

        return hours;
      }
    } else {
      const hours = await Hours.find(filters)
        .populate([
          { path: "relUser", select: "_id name surname" },
          {
            path: "relClient",
            select: "_id name valueClient gpClient",
            populate: {
              path: "gpClient",
              select: "name",
            },
          },
          {
            path: "relProject",
            select: "_id title valueProject gpProject",
            populate: {
              path: "gpProject",
              select: "name",
            },
          },
          {
            path: "relActivity",
            select: "_id title valueActivity gpActivity closedScope",
            populate: {
              path: "gpActivity",
              select: "name",
            },
          },
        ])
        .lean()
        .exec();

      return hours;
    }
  }

  async findLatest(timestamp: number) {
    const hours = await Hours.find({ initial: { $gte: timestamp } })
      .populate([
        { path: "relUser", select: "_id name surname" },
        {
          path: "relClient",
          select: "_id name valueClient gpClient",
          populate: {
            path: "gpClient",
            select: "name",
          },
        },
        {
          path: "relProject",
          select: "_id title valueProject gpProject",
          populate: {
            path: "gpProject",
            select: "name",
          },
        },
        {
          path: "relActivity",
          select: "_id title valueActivity gpActivity closedScope",
          populate: {
            path: "gpActivity",
            select: "name",
          },
        },
      ])
      .lean()
      .exec();

    return hours;
  }

  async findSome(startIndex) {
    const hours = await Hours.find()
      .limit(10)
      .skip(startIndex)
      .populate([
        { path: "relUser", select: "_id name surname" },
        {
          path: "relClient",
          select: "_id name valueClient gpClient",
          populate: {
            path: "gpClient",
            select: "name",
          },
        },
        {
          path: "relProject",
          select: "_id title valueProject gpProject",
          populate: {
            path: "gpProject",
            select: "name",
          },
        },
        {
          path: "relActivity",
          select: "_id title valueActivity gpActivity closedScope",
          populate: {
            path: "gpActivity",
            select: "name",
          },
        },
      ])
      .lean()
      .exec();

    return hours;
  }

  async findById(id: string) {
    const hours = Hours.findOne({ _id: id })
      .populate([
        { path: "relUser", select: "_id name surname" },
        {
          path: "relClient",
          select: "_id name valueClient gpClient",
          populate: {
            path: "gpClient",
            select: "name",
          },
        },
        {
          path: "relProject",
          select: "_id title valueProject gpProject",
          populate: {
            path: "gpProject",
            select: "name",
          },
        },
        {
          path: "relActivity",
          select: "_id title valueActivity gpActivity closedScope",
          populate: {
            path: "gpActivity",
            select: "name",
          },
        },
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
    releasedCall,
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
        releasedCall: releasedCall,
        activityDesc: activityDesc,
        updatedAt: Date.now(),
      }
    )
      .lean()
      .exec();
    return hours;
  }
  async findByIdAndUpdateReleasedCall(id: string, releasedCall: string) {
    const hours = await Hours.findOneAndUpdate(
      { _id: id },
      {
        releasedCall: releasedCall,
        updatedAt: Date.now(),
      }
    )
      .lean()
      .exec();
    return hours;
  }

  async delete(id: string) {
    await Hours.findOneAndDelete({ _id: id });
    return;
  }

  async findByIdAndCheck({ id, field, value }) {
    if (field == "approvedGP") {
      const hours = await Hours.findOneAndUpdate(
        { _id: id },
        {
          approvedGP: value,
          updatedAt: Date.now(),
        }
      )
        .lean()
        .exec();
      return hours;
    } else if (field == "billable") {
      const hours = await Hours.findOneAndUpdate(
        { _id: id },
        {
          billable: value,
          updatedAt: Date.now(),
        }
      )
        .lean()
        .exec();
      return hours;
    } else if (field == "released") {
      const hours = await Hours.findOneAndUpdate(
        { _id: id },
        {
          released: value,
          updatedAt: Date.now(),
        }
      )
        .lean()
        .exec();
      return hours;
    } else if (field == "approved") {
      const hours = await Hours.findOneAndUpdate(
        { _id: id },
        {
          approved: value,
          updatedAt: Date.now(),
        }
      )
        .lean()
        .exec();
      return hours;
    } else {
      return;
    }
  }
}

module.exports = new HoursRepository();
