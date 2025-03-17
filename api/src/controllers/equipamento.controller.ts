import { Request, Response } from 'express';

import {
  getAllEquipamentosService,
  getEquipamentosByFazendaService,
} from '../services/equipamento.service';
import { formatFetchParams } from '../utils';
import { errorResponse, makeResponse } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllEquipamentos = async (_req: Request, res: Response) => {
  try {
    const equipamentos = await getAllEquipamentosService();

    return makeResponse(res, equipamentos);
  } catch (error: any) {
    return errorResponse(res, error.msg || error.message);
  }
};

export const getEquipamentosByFazenda = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const { fazenda } = req.params;

  try {
    const equipamentos = await getEquipamentosByFazendaService(
      fazenda,
      formatFetchParams(page, limit)
    );
    return makeResponse(res, equipamentos);
  } catch (error: any) {
    return errorResponse(res, error.message || error.msg);
  }
};
