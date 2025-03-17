import { Request, Response } from 'express';

import { HTTP } from '../constants';
import {
  CreateNationalMarketService,
  DeleteNationalMarketService,
  getAllNationalMarketService,
  getNationalMarketServiceById,
  UpdateNationalMarketServiceService,
} from '../services/market-prices.service';
import {
  NationalMarketPriceFields,
  NationalMarketPriceRequiredFields,
} from '../types/market-prices';
import { validateInputAcceptableData, validateInputRequeridData } from './auth-helper';
import { errorResponse, makeResponse } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllNationalMarketPrice = async (_req: Request, res: Response) => {
  try {
    const NationalMarketPrice = await getAllNationalMarketService();
    return makeResponse(res, NationalMarketPrice);
  } catch (error: any) {
    return errorResponse(res, error.message || error.msg);
  }
};

export const getAllNationalMarketPriceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const NationalMarketPrice = await getNationalMarketServiceById(id);
    return makeResponse(res, NationalMarketPrice);
  } catch (error: any) {
    return errorResponse(res, error.message || error.msg);
  }
};

export const CreateNationalMarketPrice = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line prefer-destructuring

    const nationaroduction = req.body;
    validateInputRequeridData(nationaroduction, NationalMarketPriceRequiredFields);
    validateInputAcceptableData(nationaroduction, NationalMarketPriceFields);

    const newNationaroduction = await CreateNationalMarketService({
      ...nationaroduction,
    });

    return makeResponse(res, newNationaroduction);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message || 'Lamentamos, ocorreu um erro');
  }
};

export const DeleteNationalMarketPrice = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    return errorResponse(
      res,
      'Por favor informe o id do tipo dp produto que deseja remover',
      undefined,
      HTTP.BAD_REQUEST
    );

  try {
    const nationaroduction = await DeleteNationalMarketService(id);
    if (!nationaroduction)
      return errorResponse(res, 'O produto não foi encontrado', undefined, HTTP.NOT_FOUND);
    return makeResponse(res, nationaroduction);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const UpdateNationalMarketPrice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const nationaroduction = await UpdateNationalMarketServiceService(id, data);
    return makeResponse(res, nationaroduction);
  } catch (error: any) {
    return errorResponse(res, 'Lamentos, ocorreu um erro');
  }
};
