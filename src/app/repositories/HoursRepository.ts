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
    const { dataI, dataF, ...otherFilters } = filters;
    const andFilter = [];
    const filterProps = {};

    // adiciona os filtros adicionais
    Object.assign(filterProps, otherFilters);

    // adiciona o filtro de dataI e dataF, se estiverem presentes
    if (dataI !== undefined && dataI !== null) {
      const dateI = new Date(dataI).getTime();
      if (dataF !== undefined && dataF !== null) {
        const dateF = new Date(dataF).getTime();
        andFilter.push({
          $and: [{ initial: { $gte: dateI } }, { final: { $lte: dateF } }],
        });
      } else {
        const finalTime = new Date(dataI + "T23:59:59.999Z").getTime();
        andFilter.push({
          $and: [
            { initial: { $gte: dateI } },
            { initial: { $lte: finalTime } },
          ],
        });
      }
    } else if (dataF !== undefined && dataF !== null) {
      const dateF = new Date(dataF).getTime();
      const finalTime = new Date(dataF + "T23:59:59.999Z").getTime();
      andFilter.push({
        $and: [{ initial: { $gte: dateF } }, { initial: { $lte: finalTime } }],
      });
    } else {
      // busca pelo mês atual
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
      andFilter.push({
        $and: [
          { initial: { $gte: firstDayOfTheMonthTimestamp } },
          { initial: { $lte: lastDatOfTheMonthTimestamp } },
        ],
      });
    }

    const filter = andFilter.length > 0 ? { $and: andFilter } : {};

    Object.assign(filter, filterProps);

    const hours = await Hours.find(filter)
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

  async findSpecificMonth(timestamp: number) {
    const specificDay = new Date(timestamp);
    const year = specificDay.getFullYear();
    const month = specificDay.getMonth();
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

  async findSpecificMonthPaginated(timestamp: number, startIndex: number) {
    const specificDay = new Date(timestamp);
    const year = specificDay.getFullYear();
    const month = specificDay.getMonth();
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

  async findSome(startIndex: number) {
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

  async create({ initial, relUser, createdAt, updatedAt }) {
    const hours = new Hours({
      initial,
      relUser,
      createdAt,
      updatedAt,
    });

    await hours.save();

    return hours;
  }

  async findByIdAndUpdate(id, updatedFields) {
    const hours = await Hours.findOneAndUpdate(
      { _id: id },
      { $set: updatedFields, updatedAt: Date.now() },
      { new: true }
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
    const validFields = ["approvedGP", "billable", "released", "approved"];
    if (!validFields.includes(field)) {
      throw new Error(`Invalid field: ${field}`);
    }

    const update = {
      [field]: value,
      updatedAt: Date.now(),
    };

    const hours = await Hours.findOneAndUpdate({ _id: id }, update, {
      new: true,
      lean: true,
    }).exec();

    if (!hours) {
      throw new Error(`Hours not found: ${id}`);
    }

    return hours;
  }
}

module.exports = new HoursRepository();
