import { Request, Response } from 'express';

import { getAllHumanResourceByFazendaService } from '../services/human-resource.service';
import { formatFetchParams } from '../utils';
import { errorResponse, makeResponse } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllHumanResourceByFazenda = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const { fazenda } = req.params;

  try {
    const infrastructures = await getAllHumanResourceByFazendaService(
      fazenda,
      formatFetchParams(page, limit)
    );
    return makeResponse(res, infrastructures);
  } catch (error: any) {
    return errorResponse(res, error.message || error.msg);
  }
};
