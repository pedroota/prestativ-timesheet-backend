const Business = require("../models/BusinessSchema");

class BusinessRepository {
  async findAll() {
    const businessUnits = await Business.find()
      .populate([{ path: "relUser", select: "_id name surname" }])
      .lean()
      .exec();

    return businessUnits;
  }

  async findByName(nameBU: string) {
    const businessUnit = Business.findOne({ nameBU: nameBU })
      .populate([{ path: "relUser", select: "_id name surname" }])
      .lean()
      .exec();

    return businessUnit;
  }

  async create({ nameBU, relUser, createdAt, updatedAt }) {
    const businessUnit = new Business({
      nameBU,
      relUser,
      createdAt,
      updatedAt,
    });

    await businessUnit.save();

    return businessUnit;
  }

  async findByIdAndUpdate({ id, nameBU, relUser }) {
    const businessUnit = await Business.findOneAndUpdate(
      { _id: id },
      {
        nameBU: nameBU,
        relUser: relUser,
        updatedAt: Date.now(),
      }
    )
      .populate([{ path: "relUser", select: "_id name surname" }])
      .lean()
      .exec();
    return businessUnit;
  }

  async findById(id: string) {
    const businessUnit = await Business.findOne({ _id: id })
      .populate([{ path: "relUser", select: "_id name surname" }])
      .lean()
      .exec();

    return businessUnit;
  }

  async delete(id: string) {
    await Business.findOneAndDelete({ _id: id });
    return;
  }
}

module.exports = new BusinessRepository();
