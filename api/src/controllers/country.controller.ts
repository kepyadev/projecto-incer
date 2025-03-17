import { Request, Response } from 'express';

import { getAllCountryService } from '../services/contry.service';
import { errorResponse, makeResponse } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllCountry = async (_req: Request, res: Response) => {
  try {
    const counties = await getAllCountryService();

    return makeResponse(res, counties);
  } catch (error: any) {
    return errorResponse(res, error.msg);
  }
};
