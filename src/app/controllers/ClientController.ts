import { Request, Response } from "express";
const ClientRepository = require("../repositories/ClientRepository");

class ClientController {
  async index(request: Request, response: Response) {
    const page = Number(request.query.page);

    if (page) {
      const startIndex = (page - 1) * 10;
      const clients = await ClientRepository.findSome(startIndex);
      return response.json(clients);
    }

    const clients = await ClientRepository.findAll();

    return response.json(clients);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const client = await ClientRepository.findById(id);

    if (!client)
      return response
        .status(400)
        .json({ message: "Nenhum cliente encontrado." });

    return response
      .status(200)
      .json({ message: "Cliente encontrado com sucesso", client });
  }

  // o método abaixo não está funcionando como esperado, precisa ajustar a ultima função para filtrar as atividades apenas desse usuário e depois ver quais estão válidas
  async getInfo(request: Request, response: Response) {
    const { id } = request.params;

    const clients = await ClientRepository.findAll();

    // Percorra o array de clientes
    for (let i = 0; i < clients.length; i++) {
      const cliente = clients[i];

      // Percorra o array de projetos do cliente
      for (let j = 0; j < cliente.projects.length; j++) {
        const projeto = cliente.projects[j];

        // Percorra o array de atividades do projeto
        for (let k = 0; k < projeto.activities.length; k++) {
          const atividade = projeto.activities[k];

          // Remova os campos desnecessários da atividade
          delete atividade.project;
          delete atividade.valueActivity;
          delete atividade.gpActivity;
          delete atividade.description;
          delete atividade.closedScope;
          delete atividade.businessUnit;
          delete atividade.createdAt;
          delete atividade.updatedAt;
          delete atividade.__v;
        }

        // Remova os campos desnecessários do projeto
        delete projeto.idClient;
        delete projeto.valueProject;
        delete projeto.gpProject;
        delete projeto.description;
        delete projeto.createdAt;
        delete projeto.updatedAt;
        delete projeto.businessUnit;
        delete projeto.__v;
      }

      // Remova os campos desnecessários do cliente
      delete cliente.corporateName;
      delete cliente.cnpj;
      delete cliente.cep;
      delete cliente.street;
      delete cliente.streetNumber;
      delete cliente.complement;
      delete cliente.district;
      delete cliente.city;
      delete cliente.state;
      delete cliente.createdAt;
      delete cliente.updatedAt;
      delete cliente.periodIn;
      delete cliente.periodUntil;
      delete cliente.billingLimit;
      delete cliente.payDay;
      delete cliente.valueClient;
      delete cliente.gpClient;
      delete cliente.businessUnit;
      delete cliente.__v;
    }

    const filteredClients = clients.filter((client) => {
      const filteredProjects = client.projects.filter((project) => {
        const filteredActivities = project.activities.filter((activity) =>
          activity.users.includes(id)
        );
        return filteredActivities.length > 0;
      });
      return filteredProjects.length > 0;
    });

    return response.json(filteredClients);
  }

  async store(request: Request, response: Response) {
    const {
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
      businessUnit,
    } = request.body;

    const isClientAlreadyRegistered = await ClientRepository.findByName(name);

    if (isClientAlreadyRegistered)
      return response
        .status(422)
        .json({ message: "Um cliente com este nome já foi cadastrado" });

    const client = await ClientRepository.create({
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
      createdAt: Date.now(),
      updatedAt: Date.now(),
      periodIn,
      periodUntil,
      billingLimit,
      payDay,
      valueClient,
      ...(gpClient && { gpClient }),
      ...(businessUnit && { businessUnit }),
    });

    return response.status(200).json(client);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
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
      businessUnit,
    } = request.body;

    const updatedClient = await ClientRepository.findByIdAndUpdate({
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
      ...(gpClient && { gpClient }),
      ...(businessUnit && { businessUnit }),
    });

    return response
      .status(200)
      .json({ message: "Cliente atualizado com sucesso.", updatedClient });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const client = await ClientRepository.findById(id);

    if (!client)
      return response
        .status(404)
        .json({ message: "Este cliente não foi encontrado." });

    await ClientRepository.delete(id);

    return response
      .status(204)
      .json({ message: "Cliente deletado com sucesso." });
  }
}

module.exports = new ClientController();
