import { Request, Response } from 'express';

import { getAllProvinceService } from '../services/province.service';
import { errorResponse, makeResponse } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllProvice = async (_req: Request, res: Response) => {
  try {
    const counties = await getAllProvinceService();

    return makeResponse(res, counties);
  } catch (error: any) {
    return errorResponse(res, error.msg);
  }
};
