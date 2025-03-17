import { Request, Response } from 'express';

import { HTTP } from '../constants';
import { Machine } from '../constants/machine';
import {
  createMachineService,
  getAllMachinesService,
  getMachinesByFazendaService,
} from '../services/machine.service';
import { getMachineTypeByIdService } from '../services/machine-type.service';
import { formatFetchParams } from '../utils';
import { errorResponse, makeResponse } from './utils';

export const getAllMachines = async (_req: Request, res: Response) => {
  try {
    const machines = await getAllMachinesService();

    return makeResponse(res, machines);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message);
  }
};

export const getMachinesByFazenda = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const { fazenda } = req.params;
  try {
    const machines = await getMachinesByFazendaService(fazenda, formatFetchParams(page, limit));

    return makeResponse(res, machines);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message);
  }
};

export const createMachine = async (req: Request, res: Response) => {
  const machine = req.body;

  try {
    const machineType = await getMachineTypeByIdService(machine.type);

    if (!machineType) {
      return errorResponse(res, 'Tipo de máquina não encontrado', undefined, HTTP.BAD_REQUEST);
    }
    const machineResponse = await createMachineService({
      ...machine,
      [Machine.Type]: machineType,
      [Machine.Power]: machine.power as Object,
    });
    return makeResponse(res, machineResponse);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message);
  }
};
