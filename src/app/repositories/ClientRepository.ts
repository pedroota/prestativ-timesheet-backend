const Client = require("../models/ClientSchema");

class ClientRepository {
  async findAll() {
    const clients = await Client.find()
      .populate({ path: "projects", populate: { path: "activities" } })
      .lean()
      .exec();

    return clients;
  }

  async findSome(startIndex) {
    const clients = await Client.find()
      .limit(10)
      .skip(startIndex)
      .populate({ path: "projects", populate: { path: "activities" } })
      .lean()
      .exec();

    return clients;
  }

  async findByName(name: string) {
    const client = Client.findOne({ name: name })
      .populate({ path: "projects", populate: { path: "activities" } })
      .lean()
      .exec();

    return client;
  }

  async create({
    code,
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
  }) {
    const client = new Client({
      code,
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
    });

    await client.save();

    return client;
  }

  async findByIdAndUpdate({
    id,
    code,
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
  }) {
    const client = await Client.findOneAndUpdate(
      { _id: id },
      {
        code,
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
      }
    )
      .populate({ path: "projects", populate: { path: "activities" } })
      .lean()
      .exec();

    return client;
  }

  async findById(id: string) {
    const client = await Client.findOne({ _id: id })
      .populate({ path: "projects", populate: { path: "activities" } })
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
