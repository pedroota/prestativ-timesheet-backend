const Client = require("../models/ClientSchema");

class ClientRepository {
  async findAll() {
    const clients = await Client.find()
      .populate([
        { path: "projects", populate: { path: "activities" } },
        { path: "gpClient", select: "_id name surname" },
        {
          path: "businessUnit",
          select: "_id nameBU relUser",
          populate: {
            path: "relUser",
            select: "_id name surname",
          },
        },
      ])
      .lean()
      .exec();

    return clients;
  }

  async findSome(startIndex) {
    const clients = await Client.find()
      .limit(10)
      .skip(startIndex)
      .populate([
        { path: "projects", populate: { path: "activities" } },
        { path: "gpClient", select: "_id name surname" },
        {
          path: "businessUnit",
          select: "_id nameBU relUser",
          populate: {
            path: "relUser",
            select: "_id name surname",
          },
        },
      ])
      .lean()
      .exec();

    return clients;
  }

  async findByCNPJ(cnpj: string) {
    const client = Client.findOne({ cnpj: cnpj })
      .populate([
        { path: "projects", populate: { path: "activities" } },
        { path: "gpClient", select: "_id name surname" },
        {
          path: "businessUnit",
          select: "_id nameBU relUser",
          populate: {
            path: "relUser",
            select: "_id name surname",
          },
        },
      ])
      .lean()
      .exec();

    return client;
  }

  async create({
    corporateName,
    name,
    cnpj,
    cep,
    street,
    streetNumber,
    complement,
    district,
    city,
    state,
    createdAt,
    updatedAt,
    periodIn,
    periodUntil,
    billingLimit,
    payDay,
    valueClient,
    gpClient,
    businessUnit,
  }) {
    const client = new Client({
      corporateName,
      name,
      cnpj,
      cep,
      street,
      streetNumber,
      complement,
      district,
      city,
      state,
      createdAt,
      updatedAt,
      periodIn,
      periodUntil,
      billingLimit,
      payDay,
      valueClient,
      gpClient,
      businessUnit,
    });

    await client.save();

    return client;
  }

  async findByIdAndUpdate({
    id,
    corporateName,
    name,
    cnpj,
    cep,
    street,
    streetNumber,
    complement,
    district,
    city,
    state,
    periodIn,
    periodUntil,
    billingLimit,
    payDay,
    valueClient,
    gpClient,
    projects,
    businessUnit,
  }) {
    const client = await Client.findOneAndUpdate(
      { _id: id },
      {
        corporateName,
        name,
        cnpj,
        cep,
        street,
        streetNumber,
        complement,
        district,
        city,
        state,
        updatedAt: Date.now(), // não está atualizando esse dado
        periodIn,
        periodUntil,
        billingLimit,
        payDay,
        valueClient,
        gpClient,
        projects,
        businessUnit,
      }
    )
      .populate([
        { path: "projects", populate: { path: "activities" } },
        { path: "gpClient", select: "_id name surname" },
        {
          path: "businessUnit",
          select: "_id nameBU relUser",
          populate: {
            path: "relUser",
            select: "_id name surname",
          },
        },
      ])
      .lean()
      .exec();

    return client;
  }

  async findById(id: string) {
    const client = await Client.findOne({ _id: id })
      .populate([
        { path: "projects", populate: { path: "activities" } },
        { path: "gpClient", select: "_id name surname" },
        {
          path: "businessUnit",
          select: "_id nameBU relUser",
          populate: {
            path: "relUser",
            select: "_id name surname",
          },
        },
      ])
      .lean()
      .exec();

    return client;
  }

  async delete(id: string) {
    await Client.findOneAndDelete({ _id: id });
    return;
  }
}

module.exports = new ClientRepository();
