import { Request, Response } from 'express';

import { getAllProvinceService, createProvinceService } from '../services/province.service';
import { errorResponse, makeResponse } from './utils';

export const getAllProvice = async (_req: Request, res: Response) => {
  try {
    const counties = await getAllProvinceService();

    return makeResponse(res, counties);
  } catch (error: any) {
    return errorResponse(res, error.msg);
  }
};

export const createProvince = async (req: Request, res: Response) => {
   try {
    const province = await createProvinceService(req.body, req.user);

    return makeResponse(res, province);
  } catch (error: any) {
    console.log(error)
    return errorResponse(res, error.msg);
  }
};
