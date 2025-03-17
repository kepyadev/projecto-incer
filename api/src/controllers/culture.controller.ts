import { Request, Response } from 'express';

import {
  getAllCultureService,
  getCultureByFazendaService,
  getCultureByIdService,
} from '../services/cultura.service';
import { formatFetchParams } from '../utils';
import { errorResponse, makeResponse } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllCulture = async (_req: Request, res: Response) => {
  try {
    const result = await getAllCultureService(undefined);

    return makeResponse(res, result);
  } catch (error: any) {
    if (error.message === 'index_not_found_exception')
      return makeResponse(res, { data: null, count: 0 });

    return errorResponse(res, error.message);
  }
};

export const getCultureById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const CulturesType = await getCultureByIdService(id);
    return makeResponse(res, CulturesType);
  } catch (error: any) {
    return errorResponse(res, 'Lamentos, ocorreu um erro');
  }
};

export const getCultureByFazenda = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const { fazenda } = req.params;
    const CulturesType = await getCultureByFazendaService(
      fazenda as string,
      formatFetchParams(page, limit)
    );
    return makeResponse(res, CulturesType);
  } catch (error: any) {
    return errorResponse(res, 'Lamentos, ocorreu um erro');
  }
};
