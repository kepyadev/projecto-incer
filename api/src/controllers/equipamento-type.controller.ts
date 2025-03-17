import { Request, Response } from 'express';

import { HTTP, owner, User } from '../constants';
import {
  createEquipamentoTypeService,
  createManyEquipamentoTypeService,
  deleteEquipamentoTypeService,
  getAllEquipamentoTypeService,
  getEquipamentoTypeByIdService,
  updateEquipamentoTypeService,
} from '../services/equipamento-type.service';
import {
  EquipamentoTypeDTO,
  EquipamentoTypeFields,
  EquipamentoTypeRequiredFields,
} from '../types/equipamento-type';
import { IUser } from '../types/user';
import { validateInputAcceptableData, validateInputRequeridData } from './auth-helper';
import { errorResponse, makeResponse } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllEquipamentoType = async (_req: Request, res: Response) => {
  try {
    const equipamentosType = await getAllEquipamentoTypeService();
    return makeResponse(res, equipamentosType);
  } catch (error: any) {
    return errorResponse(res, 'Lamentos, ocorreu um erro');
  }
};

export const getEquipamentoTypeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const equipamentosType = await getEquipamentoTypeByIdService(id);
    return makeResponse(res, equipamentosType);
  } catch (error: any) {
    return errorResponse(res, 'Lamentos, ocorreu um erro');
  }
};

export const createEquipamentoType = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line prefer-destructuring
    const user = req.user! as IUser;

    const equipamento = req.body;

    validateInputRequeridData(equipamento, EquipamentoTypeRequiredFields);
    validateInputAcceptableData(equipamento, EquipamentoTypeFields);

    const newEquipamento = await createEquipamentoTypeService({
      ...equipamento,
      [owner]: user[User.id],
    });

    return makeResponse(res, newEquipamento);
  } catch (error: any) {
    return errorResponse(res, 'Lamentamos, ocorreu um erro');
  }
};

export const createManyEquipamentoType = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line prefer-destructuring
    const user = req.user! as IUser;

    const equipamentos = req.body as unknown[];
    const equipamentosFinal = equipamentos.map((equipamento: any) => {
      validateInputRequeridData(equipamento, EquipamentoTypeRequiredFields);
      validateInputAcceptableData(equipamento, EquipamentoTypeFields);

      return {
        ...equipamento,
        [owner]: user[User.id],
      };
    });

    const newEquipamento = await createManyEquipamentoTypeService(
      equipamentosFinal as EquipamentoTypeDTO[]
    );

    return makeResponse(res, newEquipamento);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message || 'Lamentamos, ocorreu um erro');
  }
};

export const deleteEquipamentoType = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    return errorResponse(
      res,
      'Por favor informe o id do tipo de equipamento que deseja remover',
      undefined,
      HTTP.BAD_REQUEST
    );

  try {
    const equipamentoType = await deleteEquipamentoTypeService(id);
    if (!equipamentoType)
      return errorResponse(res, 'Tipo de equipamento não encontrado', undefined, HTTP.NOT_FOUND);
    return makeResponse(res, equipamentoType);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const updateEquipamentoType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const EquipamentosType = await updateEquipamentoTypeService(id, data);
    return makeResponse(res, EquipamentosType);
  } catch (error: any) {
    return errorResponse(res, 'Lamentos, ocorreu um erro');
  }
};
