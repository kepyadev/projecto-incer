import { Request, Response } from 'express';

import { getAllCountyService } from '../services/county.service';
import { errorResponse, makeResponse } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllCounty = async (_req: Request, res: Response) => {
  try {
    const counties = await getAllCountyService();

    return makeResponse(res, counties);
  } catch (error: any) {
    return errorResponse(res, error.msg);
  }
};
