import { Request, Response } from "express";
const HoursRepository = require("../repositories/HoursRepository");
// const ActivityRepository = require("../repositories/ActivityRepository");
// const ProjectRepository = require("../repositories/ProjectRepository");

interface Hours {
  initial: number;
  final: number;
  adjustment: number;
  relClient: string;
  relProject: string;
  relActivity: string;
  relUser: string;
  approvedGP: boolean;
  billable: boolean;
  released: boolean;
  approved: boolean;
  releasedCall: string;
  activityDesc: string;
}

class HoursController {
  async index(request: Request, response: Response) {
    const page = Number(request.query.page);
    const date = Number(request.query.date);
    // "date" é um timestamp, basta gerar um timestamp de qualquer dia do mês desejado

    if (date && page) {
      const startIndex = (page - 1) * 10;

      const hours = await HoursRepository.findSpecificMonthPaginated(
        date,
        startIndex
      );

      hours.sort(function (x: { initial: number }, y: { initial: number }) {
        return x.initial - y.initial;
      });

      return response.json(hours);
    }
    if (date) {
      const hours = await HoursRepository.findSpecificMonth(date);

      hours.sort(function (x: { initial: number }, y: { initial: number }) {
        return x.initial - y.initial;
      });

      return response.json(hours);
    }

    if (page) {
      const startIndex = (page - 1) * 10;
      const hours = await HoursRepository.findSome(startIndex);

      hours.sort(function (x: { initial: number }, y: { initial: number }) {
        return x.initial - y.initial;
      });

      return response.json(hours);
    }

    const hours = await HoursRepository.findAll();

    hours.sort(function (x: { initial: number }, y: { initial: number }) {
      return x.initial - y.initial;
    });

    return response.json(hours);
  }

  async indexByUser(request: Request, response: Response) {
    const { id } = request.params;

    const hours = await HoursRepository.findByUserId(id);

    if (!hours) {
      return response
        .status(400)
        .json({ message: "Nenhum lançamento encontrado para este usuário" });
    }

    hours.sort(function (x: { initial: number }, y: { initial: number }) {
      return x.initial - y.initial;
    });

    return response.status(200).json(hours);
  }

  async filter(request: Request, response: Response) {
    const filters = request.query;
    // APIURL/hours/filter?dataI=2023-01-01&dataF=2023-01-31&relClient=id&relProject=id&relActivity=id&relUser=id
    // se o filter estiver vazio ele irá retornar tudo

    let hours = [];

    if (Object.keys(filters).length === 0 || !filters) {
      hours = await HoursRepository.findLatest();
    } else {
      hours = await HoursRepository.findWithFilters(filters);
    }

    hours.sort((x, y) => y.initial - x.initial);

    return response.json(hours);
  }

  async latest(_request: Request, response: Response) {
    const today = new Date();
    today.setMonth(-1);
    const timestamp = today.getTime();

    const hours = await HoursRepository.findLatest(timestamp);

    hours.sort(function (x: { initial: number }, y: { initial: number }) {
      return x.initial - y.initial;
    });

    return response.json(hours);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const hours = await HoursRepository.findById(id);

    if (!hours)
      return response
        .status(400)
        .json({ message: "Nenhum lançamento encontrado." });

    return response
      .status(200)
      .json({ message: "Lançamento encontrado com sucesso", hours });
  }

  async store(request: Request, response: Response) {
    const { relUser } = request.body;

    const getFirstDayOfThisMonth = () => {
      const now = new Date();
      const today23and59 = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );
      today23and59.setHours(23, 59, 0, 0);
      return today23and59.getTime() + 1;
    };

    const hours = await HoursRepository.create({
      initial: getFirstDayOfThisMonth(),
      relUser,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return response.status(200).json(hours);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
      initial,
      final,
      adjustment,
      relActivity,
      relProject,
      relClient,
      relUser,
      approvedGP,
      billable,
      released,
      approved,
      activityDesc,
      releasedCall,
    } = request.body;

    // reativar essa função depois para não conseguir modificar um lançamento e colocar uma data que já foi lançada
    const alreadyReleased = await HoursRepository.findHoursPostedInThatPeriod({
      relActivity,
      relUser,
      initial,
      final,
    });

    if (alreadyReleased) {
      return response.status(409).json({
        message: "Já houve um Lançamento de Horas nesse período.",
      });
    }

    const updatedHours: Hours = {
      ...(initial && { initial }),
      ...(final && { final }),
      ...(adjustment && { adjustment }),
      ...(relActivity && { relActivity }),
      ...(relProject && { relProject }),
      ...(relClient && { relClient }),
      ...(relUser && { relUser }),
      ...(approvedGP && { approvedGP }),
      ...(billable && { billable }),
      ...(released && { released }),
      ...(approved && { approved }),
      ...(activityDesc && { activityDesc }),
      ...(releasedCall && { releasedCall }),
    };

    const updated = await HoursRepository.findByIdAndUpdate(id, updatedHours);

    return response.status(200).json({
      message: "Este Lançamento de horas foi atualizado com sucesso.",
      updated,
    });
  }

  async updateReleasedCall(request: Request, response: Response) {
    const { id } = request.params;
    const { releasedCall } = request.body;

    const updatedHours = await HoursRepository.findByIdAndUpdateReleasedCall(
      id,
      releasedCall
    );

    return response.status(200).json({
      message: "Este Lançamento de horas foi atualizado com sucesso.",
      updatedHours,
    });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const hours = await HoursRepository.findById(id);

    if (!hours)
      return response
        .status(404)
        .json({ message: "Este Lançamento de Horas não foi encontrado." });

    await HoursRepository.delete(id);

    return response
      .status(204)
      .json({ message: "Este Lançamento de Horas foi deletado com sucesso." });
  }

  async check(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { field, value } = request.body;

      await HoursRepository.findByIdAndCheck({
        id,
        field,
        value,
      });

      return response.status(200).json({
        message: `O campo ${field} foi marcado como ${value}`,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: "Ocorreu um erro ao tentar atualizar o registro",
      });
    }
  }
}

module.exports = new HoursController();
