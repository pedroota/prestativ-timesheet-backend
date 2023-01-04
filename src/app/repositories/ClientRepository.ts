const Client = require("../models/ClientSchema");

class ClientRepository {
  async findAll() {
    const clients = await Client.find();

    return clients;
  }

  async findByName(name: string) {
    const client = Client.findOne({ name: name });

    return client;
  }

  async create({
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
}

module.exports = new ClientRepository();
