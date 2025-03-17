import { Request, Response } from 'express';

import { HTTP, owner, User } from '../constants';
import {
  createMeioEstacionarioService,
  deleteMeioEstacionarioService,
  getAllMeioEstacionarioService,
  getMeioEstacionarioByFazendaService,
  getMeioEstacionarioByIdService,
} from '../services/meio-estacionario.service';
import { MeioEstacionarioFields, MeioEstacionarioRequiredFields } from '../types/meio-estacionario';
import { IUser } from '../types/user';
import { formatFetchParams } from '../utils';
import { validateInputAcceptableData, validateInputRequeridData } from './auth-helper';
import { errorResponse, makeResponse } from './utils';
// eslint-disable-next-line import/prefer-default-export
export const getAllMeioEstacionario = async (_req: Request, res: Response) => {
  try {
    const meioEstacionariosType = await getAllMeioEstacionarioService();
    return makeResponse(res, meioEstacionariosType);
  } catch (error: any) {
    return errorResponse(res, error.message || 'Lamentamos, ocorreu um erro');
  }
};

export const getMeioEstacionarioById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const meioEstacionariosType = await getMeioEstacionarioByIdService(id);
    return makeResponse(res, meioEstacionariosType);
  } catch (error: any) {
    return errorResponse(res, error.message || 'Lamentamos, ocorreu um erro');
  }
};

export const getMeioEstacionarioByFazenda = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const { fazenda } = req.params;
  try {
    const machines = await getMeioEstacionarioByFazendaService(
      fazenda,
      formatFetchParams(page, limit)
    );

    return makeResponse(res, machines);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message);
  }
};

export const createMeioEstacionario = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line prefer-destructuring
    const user = req.user! as IUser;

    const meioEstacionario = req.body;

    validateInputRequeridData(meioEstacionario, MeioEstacionarioRequiredFields);
    validateInputAcceptableData(meioEstacionario, MeioEstacionarioFields);

    const newMeioEstacionario = await createMeioEstacionarioService({
      ...meioEstacionario,
      [owner]: user[User.id],
    });

    return makeResponse(res, newMeioEstacionario);
  } catch (error: any) {
    return errorResponse(res, 'Lamentamos, ocorreu um erro');
  }
};

export const deleteMeioEstacionario = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    return errorResponse(
      res,
      'Por favor informe o id do tipo de meio estacionário que deseja remover',
      undefined,
      HTTP.BAD_REQUEST
    );

  try {
    const MeioEstacionario = await deleteMeioEstacionarioService(id);
    if (!MeioEstacionario)
      return errorResponse(
        res,
        'Tipo de meio estacionário não encontrado',
        undefined,
        HTTP.NOT_FOUND
      );
    return makeResponse(res, MeioEstacionario);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};
