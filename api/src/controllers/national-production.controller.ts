import { Request, Response } from 'express';

import { HTTP } from '../constants';
import { createManyInfrastructureTypeService } from '../services/infrastructure-type.service';
import {
  CreateNationalProductionService,
  DeleteNationalProductionService,
  getAllNationalProductionService,
  getNationalProductionServiceById,
  UpdateNationalProductionService,
} from '../services/national-production.service';
import { InfrastructureTypeDTO } from '../types/infrastructure-type';
import {
  NationalProductionFields,
  NationalProductionRequiredFields,
} from '../types/national-production';
import { validateInputAcceptableData, validateInputRequeridData } from './auth-helper';
import { errorResponse, makeResponse } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllNationalProduction = async (_req: Request, res: Response) => {
  try {
    const nationalProduction = await getAllNationalProductionService();
    return makeResponse(res, nationalProduction);
  } catch (error: any) {
    return errorResponse(res, error.message || error.msg);
  }
};

export const getAllNationalProductionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const nationalProduction = await getNationalProductionServiceById(id);
    return makeResponse(res, nationalProduction);
  } catch (error: any) {
    return errorResponse(res, error.message || error.msg);
  }
};

export const CreateNationalProduction = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line prefer-destructuring

    const nationaroduction = req.body;
    validateInputRequeridData(nationaroduction, NationalProductionRequiredFields);
    validateInputAcceptableData(nationaroduction, NationalProductionFields);

    const newNationaroduction = await CreateNationalProductionService({
      ...nationaroduction,
    });

    return makeResponse(res, newNationaroduction);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message || 'Lamentamos, ocorreu um erro');
  }
};

export const createManyInfrastructureType = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line prefer-destructuring

    const nationaroductions = req.body as unknown[];

    const nationaroductionFinal = nationaroductions.map((nationaroduction: any) => {
      validateInputRequeridData(nationaroduction, NationalProductionRequiredFields);
      validateInputAcceptableData(nationaroduction, NationalProductionFields);

      return {
        ...nationaroduction,
      };
    });

    const newNationaroduction = await createManyInfrastructureTypeService(
      nationaroductionFinal as InfrastructureTypeDTO[]
    );

    return makeResponse(res, newNationaroduction);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message || 'Lamentamos, ocorreu um erro');
  }
};

export const DeleteNationalProduction = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    return errorResponse(
      res,
      'Por favor informe o id do tipo de infraestrutura que deseja remover',
      undefined,
      HTTP.BAD_REQUEST
    );

  try {
    const nationaroduction = await DeleteNationalProductionService(id);
    if (!nationaroduction)
      return errorResponse(res, 'Tipo de infraestrutura não encontrado', undefined, HTTP.NOT_FOUND);
    return makeResponse(res, nationaroduction);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const UpdateNationalProduction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const nationaroduction = await UpdateNationalProductionService(id, data);
    return makeResponse(res, nationaroduction);
  } catch (error: any) {
    return errorResponse(res, 'Lamentos, ocorreu um erro');
  }
};
