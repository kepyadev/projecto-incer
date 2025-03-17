import { Request, Response } from 'express';

import { HTTP, owner, User } from '../constants';
import { getMachineTypeById } from '../repositories/NoSql/machine-type.repository';
import {
  createMachineTypeService,
  createManyMachineTypeService,
  deleteMachineTypeService,
  getAllMachineTypeService,
  updateMachineTypeService,
} from '../services/machine-type.service';
import {
  MachineTypeDTO,
  MachineTypeFields,
  MachineTypeRequiredFields,
} from '../types/machine-type.type';
import { IUser } from '../types/user';
import { validateInputAcceptableData, validateInputRequeridData } from './auth-helper';
import { errorResponse, makeResponse } from './utils';

export const getAllMachineTypes = async (_req: Request, res: Response) => {
  try {
    const counties = await getAllMachineTypeService();
    // eslint-disable-next-line no-console
    console.log('machinetypes', counties);
    return makeResponse(res, counties);
  } catch (error: any) {
    return errorResponse(res, error.msg);
  }
};

export const getMachineTypesById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const counties = await getMachineTypeById(id);

    return makeResponse(res, counties);
  } catch (error: any) {
    return errorResponse(res, error.msg);
  }
};

export const createMachineTypes = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line prefer-destructuring
    const user = req.user! as IUser;

    const machine = req.body;

    validateInputRequeridData(machine, MachineTypeRequiredFields);
    validateInputAcceptableData(machine, MachineTypeFields);

    const newMachine = await createMachineTypeService({ ...machine, [owner]: user[User.id] });

    return makeResponse(res, newMachine);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message || 'Lamentamos, ocorreu um erro');
  }
};

export const createManyMachineType = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line prefer-destructuring
    const user = req.user! as IUser;

    const machines = req.body as unknown[];
    const machinesFinal = machines.map((machine: any) => {
      validateInputRequeridData(machine, MachineTypeRequiredFields);
      validateInputAcceptableData(machine, MachineTypeFields);

      return {
        ...machine,
        [owner]: user[User.id],
      };
    });

    const newMachine = await createManyMachineTypeService(machinesFinal as MachineTypeDTO[]);

    return makeResponse(res, newMachine);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message || 'Lamentamos, ocorreu um erro');
  }
};

export const deleteMachineType = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    return errorResponse(
      res,
      'Por favor informe o id do tipo de máquina que deseja remover',
      undefined,
      HTTP.BAD_REQUEST
    );

  try {
    const machineType = await deleteMachineTypeService(id);
    if (!machineType)
      return errorResponse(res, 'Tipo de máquina não encontrado', undefined, HTTP.NOT_FOUND);
    return makeResponse(res, machineType);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const updateMachineType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const MachinesType = await updateMachineTypeService(id, data);
    return makeResponse(res, MachinesType);
  } catch (error: any) {
    return errorResponse(res, 'Lamentos, ocorreu um erro');
  }
};
