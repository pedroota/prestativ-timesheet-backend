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
  }) {
    const client = await Client.findOneAndUpdate(
      { _id: id },
      {
        code: code,
        name: name,
        cnpj: cnpj,
        cep: cep,
        street: street,
        streetNumber: streetNumber,
        complement: complement,
        district: district,
        city: city,
        state: state,
        updatedAt: Date.now(), // não está atualizando esse dado
        periodIn: periodIn,
        periodUntil: periodUntil,
        billingLimit: billingLimit,
        payDay: payDay,
        valueClient: valueClient,
        gpClient: gpClient,
      }
    );
    return client;
  }

  async findById(id: string) {
    const client = await Client.findOne({ _id: id });

    return client;
  }

  async delete(id: string) {
    await Client.findOneAndDelete({ _id: id });
    return;
  }
}

module.exports = new ClientRepository();
