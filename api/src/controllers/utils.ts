import { Response } from 'express';

import { HTTP } from '../constants';

export const removeExtraAspas = (text: string): string => text.replace('"', '').replace('"', '');

export const errorResponse = (
  res: Response,
  error?: string,
  translationKey: string = 'E-10000',
  status: number = HTTP.INTERNAL_SERVER_ERROR,
  errorCode?: number
) =>
  res.status(status).json({
    msg: error || 'Lamentamos, infelizmente ocorreu um erro',
    error,
    translation_key: translationKey,
    error_code: errorCode || status,
  });

export const makeResponse = (
  res: Response,
  dataResponse: any,
  msg?: string,
  status: number = HTTP.SUCCESS
) =>
  res.status(status).send({
    payload: dataResponse,
    msg: msg || '',
  });

export const extractPaginationParams = (params: Record<string, any>) => {
  const { limit: nlimit, page: npage } = params;
  const limit = nlimit ? (nlimit as unknown as number) : 15;
  const page = npage ? (npage as unknown as number) : 1;

  return { limit, page };
};
export const removePaginationParams = (params: Record<string, any>) => {
  delete params.page;
  delete params.limit;
  return params;
};
