import { Request, Response } from "express";
const ClientRepository = require("../repositories/ClientRepository");

class ClientController {
  async index(request: Request, response: Response) {
    const clients = await ClientRepository.findAll();

    return response.json(clients);
  }

  // show(request: Request, response: Response) {}

  async store(request: Request, response: Response) {
    const {
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
    } = request.body;

    const isClientAlreadyRegistered = await ClientRepository.findByName(name);

    if (isClientAlreadyRegistered)
      return response
        .status(422)
        .json({ message: "Um cliente com este nome já foi cadastrado" });

    const client = await ClientRepository.create({
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
      createdAt: Date.now(),
      updatedAt: Date.now(),
      periodIn,
      periodUntil,
      billingLimit,
      payDay,
      valueClient,
      gpClient,
    });

    return response.status(200).json(client);
  }

  // update(request: Request, response: Response) {}

  // delete(request: Request, response: Response) {}
}

module.exports = new ClientController();
