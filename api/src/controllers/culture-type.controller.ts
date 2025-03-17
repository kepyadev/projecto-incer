import { Request, Response } from 'express';

import { HTTP, owner, User } from '../constants';
import {
  createCulturaTypeService,
  createManyCulturaTypeService,
  deleteCulturaTypeService,
  getAllCultureTypeService,
  getCulturaTypeByIdService,
  updateCulturaTypeService,
} from '../services/culture-type.service';
import {
  CulturaTypeDTO,
  CulturaTypeFields,
  CulturaTypeRequiredFields,
} from '../types/cultura-type';
import { IUser } from '../types/user';
import { validateInputAcceptableData, validateInputRequeridData } from './auth-helper';
import { errorResponse, makeResponse } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllCultureType = async (_req: Request, res: Response) => {
  try {
    const CulturesType = await getAllCultureTypeService();
    return makeResponse(res, CulturesType);
  } catch (error: any) {
    return errorResponse(res, error.message || 'Lamentos, ocorreu um erro');
  }
};

export const getCultureTypeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const CulturesType = await getCulturaTypeByIdService(id);
    return makeResponse(res, CulturesType);
  } catch (error: any) {
    return errorResponse(res, 'Lamentos, ocorreu um erro');
  }
};

export const createCulturaType = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line prefer-destructuring
    const user = req.user! as IUser;

    const cultura = req.body;

    validateInputRequeridData(cultura, CulturaTypeRequiredFields);
    validateInputAcceptableData(cultura, CulturaTypeFields);

    const newCultura = await createCulturaTypeService({ ...cultura, [owner]: user[User.id] });

    return makeResponse(res, newCultura);
  } catch (error: any) {
    return errorResponse(res, 'Lamentamos, ocorreu um erro');
  }
};

export const createManyCulturaType = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line prefer-destructuring
    const user = req.user! as IUser;

    const culturas = req.body as unknown[];
    const culturasFinal = culturas.map((cultura: any) => {
      validateInputRequeridData(cultura, CulturaTypeRequiredFields);
      validateInputAcceptableData(cultura, CulturaTypeFields);

      return {
        ...cultura,
        [owner]: user[User.id],
      };
    });

    const newCultura = await createManyCulturaTypeService(culturasFinal as CulturaTypeDTO[]);

    return makeResponse(res, newCultura);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message || 'Lamentamos, ocorreu um erro');
  }
};

export const deleteCulturaType = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    return errorResponse(
      res,
      'Por favor informe o id do tipo de cultura que deseja remover',
      undefined,
      HTTP.BAD_REQUEST
    );

  try {
    const culturaType = await deleteCulturaTypeService(id);
    if (!culturaType)
      return errorResponse(res, 'Tipo de cultura não encontrado', undefined, HTTP.NOT_FOUND);
    return makeResponse(res, culturaType);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const updateCultureType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const CulturesType = await updateCulturaTypeService(id, data);
    return makeResponse(res, CulturesType);
  } catch (error: any) {
    return errorResponse(res, 'Lamentos, ocorreu um erro');
  }
};
