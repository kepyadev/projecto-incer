/* eslint-disable import/prefer-default-export */
import { Request, Response } from 'express';

import { getAllLogsRepositories } from '../repositories/NoSql/logs.repository';
import { errorResponse, makeResponse } from './utils';

export const getAllLogs = async (_req: Request, res: Response) => {
  try {
    const logs = await getAllLogsRepositories();

    return makeResponse(res, { data: logs, count: logs.length });
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};
