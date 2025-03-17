import { Request, Response } from 'express';

import getAllAssociationService from '../services/association.service';
import { errorResponse, makeResponse } from './utils';

const getAllAssociation = async (_req: Request, res: Response) => {
  try {
    const params = _req.query;
    // Passa os parâmetros para o serviço
    const cooperatives = await getAllAssociationService(params as any);

    return makeResponse(res, cooperatives);
  } catch (error: any) {
    if (error.message === 'index_not_found_exception')
      return makeResponse(res, { data: null, count: 0 });
    return errorResponse(res, error.message);
  }
};

export default getAllAssociation;
