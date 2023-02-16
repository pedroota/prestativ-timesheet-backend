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
            select: "name surname",
          },
        },
        {
          path: "relProject",
          select: "_id title valueProject gpProject",
          populate: {
            path: "gpProject",
            select: "name surname",
          },
        },
        {
          path: "relActivity",
          select: "_id title valueActivity gpActivity closedScope",
          populate: {
            path: "gpActivity",
            select: "name surname",
          },
        },
      ])
      .lean()
      .exec();

    return hours;
  }

  async findWithFilters(filters) {
    // APIURL/hours/filter ? dataI = 2023-01-27 & dataF = 2023-01-28 & relClient = 63d3ea3bbc9cf01242e73c50 & relProject = id & relActivity = id & relUser = id
    if (filters.dataI) {
      const dateIFormated = filters.dataI.split("-");
      const timeINI = new Date(
        Number(dateIFormated[0]),
        Number(dateIFormated[1]) - 1,
        Number(dateIFormated[2]),
        0,
        0,
        0,
        0
      ).getTime();

      if (filters.dataI && filters.dataF) {
        const dateFFormated = filters.dataF.split("-");
        const timeEND = new Date(
          Number(dateFFormated[0]),
          Number(dateFFormated[1]) - 1,
          Number(dateFFormated[2]),
          23,
          59,
          59,
          999
        ).getTime();

        delete filters.dataI;
        delete filters.dataF;

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
                  select: "name surname",
                },
              },
              {
                path: "relProject",
                select: "_id title valueProject gpProject",
                populate: {
                  path: "gpProject",
                  select: "name surname",
                },
              },
              {
                path: "relActivity",
                select: "_id title valueActivity gpActivity closedScope",
                populate: {
                  path: "gpActivity",
                  select: "name surname",
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
                  select: "name surname",
                },
              },
              {
                path: "relProject",
                select: "_id title valueProject gpProject",
                populate: {
                  path: "gpProject",
                  select: "name surname",
                },
              },
              {
                path: "relActivity",
                select: "_id title valueActivity gpActivity closedScope",
                populate: {
                  path: "gpActivity",
                  select: "name surname",
                },
              },
            ])
            .lean()
            .exec();

          return hours;
        }
      } else {
        const timeEND = new Date(
          Number(dateIFormated[0]),
          Number(dateIFormated[1]) - 1,
          Number(dateIFormated[2]),
          23,
          59,
          59,
          999
        ).getTime();

        delete filters.dataI;

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
                  select: "name surname",
                },
              },
              {
                path: "relProject",
                select: "_id title valueProject gpProject",
                populate: {
                  path: "gpProject",
                  select: "name surname",
                },
              },
              {
                path: "relActivity",
                select: "_id title valueActivity gpActivity closedScope",
                populate: {
                  path: "gpActivity",
                  select: "name surname",
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
                  select: "name surname",
                },
              },
              {
                path: "relProject",
                select: "_id title valueProject gpProject",
                populate: {
                  path: "gpProject",
                  select: "name surname",
                },
              },
              {
                path: "relActivity",
                select: "_id title valueActivity gpActivity closedScope",
                populate: {
                  path: "gpActivity",
                  select: "name surname",
                },
              },
            ])
            .lean()
            .exec();

          return hours;
        }
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
              select: "name surname",
            },
          },
          {
            path: "relProject",
            select: "_id title valueProject gpProject",
            populate: {
              path: "gpProject",
              select: "name surname",
            },
          },
          {
            path: "relActivity",
            select: "_id title valueActivity gpActivity closedScope",
            populate: {
              path: "gpActivity",
              select: "name surname",
            },
          },
        ])
        .lean()
        .exec();

      return hours;
    }
  }

  async findByUserId(id: string) {
    const hours = await Hours.find({ relUser: id })
      .populate([
        { path: "relUser", select: "_id name surname" },
        {
          path: "relClient",
          select: "_id name valueClient gpClient",
          populate: {
            path: "gpClient",
            select: "name surname",
          },
        },
        {
          path: "relProject",
          select: "_id title valueProject gpProject",
          populate: {
            path: "gpProject",
            select: "name surname",
          },
        },
        {
          path: "relActivity",
          select: "_id title valueActivity gpActivity closedScope",
          populate: {
            path: "gpActivity",
            select: "name surname",
          },
        },
      ])
      .lean()
      .exec();

    return hours;
  }

  async findLatest() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDayOfTheMonthTimestamp = new Date(year, month, 1).getTime();
    const lastDatOfTheMonthTimestamp = new Date(
      year,
      month + 1,
      0,
      23,
      59,
      59,
      999
    ).getTime();
    const hours = await Hours.find({
      $and: [
        { initial: { $gte: firstDayOfTheMonthTimestamp } },
        { initial: { $lte: lastDatOfTheMonthTimestamp } },
      ],
    })
      .populate([
        { path: "relUser", select: "_id name surname" },
        {
          path: "relClient",
          select: "_id name valueClient gpClient",
          populate: {
            path: "gpClient",
            select: "name surname",
          },
        },
        {
          path: "relProject",
          select: "_id title valueProject gpProject",
          populate: {
            path: "gpProject",
            select: "name surname",
          },
        },
        {
          path: "relActivity",
          select: "_id title valueActivity gpActivity closedScope",
          populate: {
            path: "gpActivity",
            select: "name surname",
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
            select: "name surname",
          },
        },
        {
          path: "relProject",
          select: "_id title valueProject gpProject",
          populate: {
            path: "gpProject",
            select: "name surname",
          },
        },
        {
          path: "relActivity",
          select: "_id title valueActivity gpActivity closedScope",
          populate: {
            path: "gpActivity",
            select: "name surname",
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
            select: "name surname",
          },
        },
        {
          path: "relProject",
          select: "_id title valueProject gpProject",
          populate: {
            path: "gpProject",
            select: "name surname",
          },
        },
        {
          path: "relActivity",
          select: "_id title valueActivity gpActivity closedScope",
          populate: {
            path: "gpActivity",
            select: "name surname",
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

  async findHoursPostedInThatPeriod({ relActivity, relUser, initial, final }) {
    const hours = await Hours.find({
      relActivity: relActivity,
      relUser: relUser,
      $or: [
        {
          $and: [{ initial: { $lte: final } }, { final: { $gte: final } }],
        },
        {
          $and: [{ initial: { $lte: initial } }, { final: { $gte: initial } }],
        },
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

    if (hours.length > 0) {
      return true;
    } else {
      return false;
    }
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
