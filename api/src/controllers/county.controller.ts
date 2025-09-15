import { Request, Response } from 'express';

import { getAllCountyService, createCountyService } from '../services/county.service';
import { errorResponse, makeResponse } from './utils';

export const getAllCounty = async (_req: Request, res: Response) => {
  try {
    const counties = await getAllCountyService();

    return makeResponse(res, counties);
  } catch (error: any) {
    return errorResponse(res, error.msg);
  }
};

export const createCounty = async (req: Request, res: Response) => {
  try {
    const county = await createCountyService(req.body, req.user);

    return makeResponse(res, county);
  } catch (error: any) {
    console.log(error)
    return errorResponse(res, error.msg);
  }
};
