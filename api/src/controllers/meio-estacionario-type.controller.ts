import { Request, Response } from 'express';

import { HTTP, owner, User } from '../constants';
import {
  createManyMeioEstacionarioTypeService,
  createMeioEstacionarioTypeService,
  deleteMeioEstacionarioTypeService,
  getAllMeioEstacionarioTypeService,
  getMeioEstacionarioTypeByIdService,
  updateMeioEstacionarioTypeService,
} from '../services/meio-estacionario-type.service';
import {
  MeioEstacionarioTypeDTO,
  MeioEstacionarioTypeFields,
  MeioEstacionarioTypeRequiredFields,
} from '../types/meio-estacionario-type';
import { IUser } from '../types/user';
import { validateInputAcceptableData, validateInputRequeridData } from './auth-helper';
import { errorResponse, makeResponse } from './utils';
// eslint-disable-next-line import/prefer-default-export
export const getAllMeioEstacionarioType = async (_req: Request, res: Response) => {
  try {
    const meioEstacionariosType = await getAllMeioEstacionarioTypeService();
    return makeResponse(res, meioEstacionariosType);
  } catch (error: any) {
    return errorResponse(res, error.message || error.msg || 'Lamentamos, ocorreu um erro1');
  }
};

export const getMeioEstacionarioTypeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const meioEstacionariosType = await getMeioEstacionarioTypeByIdService(id);
    return makeResponse(res, meioEstacionariosType);
  } catch (error: any) {
    return errorResponse(res, error.message || error.msg || 'Lamentamos, ocorreu um erro');
  }
};

export const createMeioEstacionarioType = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line prefer-destructuring
    const user = req.user! as IUser;

    const meioEstacionarioType = req.body;

    validateInputRequeridData(meioEstacionarioType, MeioEstacionarioTypeRequiredFields);
    validateInputAcceptableData(meioEstacionarioType, MeioEstacionarioTypeFields);

    const newMeioEstacionario = await createMeioEstacionarioTypeService({
      ...meioEstacionarioType,
      [owner]: user[User.id],
    });

    return makeResponse(res, newMeioEstacionario);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message || 'Lamentamos, ocorreu um erro');
  }
};

export const createManyMeioEstacionarioType = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line prefer-destructuring
    const user = req.user! as IUser;

    const meioEstacionarios = req.body as unknown[];

    const meioEstacionariosFinal = meioEstacionarios.map((meioEstacionario: any) => {
      validateInputRequeridData(meioEstacionario, MeioEstacionarioTypeRequiredFields);
      validateInputAcceptableData(meioEstacionario, MeioEstacionarioTypeFields);

      return {
        ...meioEstacionario,
        [owner]: user[User.id],
      };
    });

    const newMeioEstacionario = await createManyMeioEstacionarioTypeService(
      meioEstacionariosFinal as MeioEstacionarioTypeDTO[]
    );

    return makeResponse(res, newMeioEstacionario);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message || 'Lamentamos, ocorreu um erro');
  }
};

export const deleteMeioEstacionarioType = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    return errorResponse(
      res,
      'Por favor informe o id do tipo de meio estacionário que deseja remover',
      undefined,
      HTTP.BAD_REQUEST
    );

  try {
    const meioEstacionarioType = await deleteMeioEstacionarioTypeService(id);
    if (!meioEstacionarioType)
      return errorResponse(
        res,
        'Tipo de meio estacionário não encontrado',
        undefined,
        HTTP.NOT_FOUND
      );
    return makeResponse(res, meioEstacionarioType);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const updateMeioEstacionarioType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const MeioEstacionariosType = await updateMeioEstacionarioTypeService(id, data);
    return makeResponse(res, MeioEstacionariosType);
  } catch (error: any) {
    return errorResponse(res, 'Lamentos, ocorreu um erro');
  }
};
