import { Request, Response } from 'express';

import { getAnimalByFazendaService } from '../services/animal.service';
import { formatFetchParams } from '../utils';
import { errorResponse, makeResponse } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const getAnimalByFazenda = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const { fazenda } = req.params;
    const CulturesType = await getAnimalByFazendaService(
      fazenda as string,
      formatFetchParams(page, limit)
    );
    return makeResponse(res, CulturesType);
  } catch (error: any) {
    return errorResponse(res, error.message || error.msg || 'Lamentos, ocorreu um erro');
  }
};
