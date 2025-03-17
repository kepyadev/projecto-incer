import { Request, Response } from 'express';

import {
  getAllInfrastrutureService,
  getInfrastrutureByFazendaService,
} from '../services/infrastruture.service';
import { formatFetchParams } from '../utils';
import { errorResponse, makeResponse } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllInfrastructure = async (_req: Request, res: Response) => {
  try {
    const infrastructures = await getAllInfrastrutureService();
    return makeResponse(res, infrastructures);
  } catch (error: any) {
    return errorResponse(res, error.message || error.msg);
  }
};

export const getInfrastructureByFazenda = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const { fazenda } = req.params;

  try {
    const infrastructures = await getInfrastrutureByFazendaService(
      fazenda,
      formatFetchParams(page, limit)
    );
    return makeResponse(res, infrastructures);
  } catch (error: any) {
    return errorResponse(res, error.message || error.msg);
  }
};
