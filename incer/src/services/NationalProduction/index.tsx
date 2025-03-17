import APIROUTES from '../../constants/api-routes';
import {
  INationalProduction,
  INationalProductionData,
} from '../../types/nationalProduction';
import { MsgData } from '../../types/services';
import { formatQuery } from '../service-helper';
import { AllowedQueryKeys, HttpResponse, ListDataResponse } from '../services.types';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../utils';

export const getAllNationalProduction = (
  params: AllowedQueryKeys = {}
): Promise<
  HttpResponse<MsgData<ListDataResponse<ReadonlyArray<INationalProduction>>>>
> =>
  // Promise.resolve(apiListResponse([cultureMock]));
  getRequest(`${APIROUTES.NATIONAL_PRODUCTION}?${formatQuery(params)}`);

export const getAllNationalProductionById = (
  id: string
): Promise<HttpResponse<MsgData<INationalProduction>>> =>
  getRequest(`${APIROUTES.NATIONAL_PRODUCTION}/${id}`);

export const CreateNationalProduction = (data: INationalProductionData) =>
  postRequest(APIROUTES.NATIONAL_PRODUCTION, data);

export const CreateManyNationalProduction = (
  data: Record<string, unknown>[]
): Promise<
  HttpResponse<MsgData<ListDataResponse<ReadonlyArray<INationalProduction>>>>
> => postRequest(`${APIROUTES.NATIONAL_PRODUCTION}/many`, data);

export const UpdateNationalProduction = (
  data: INationalProductionData,
  id: string
) => patchRequest(`${APIROUTES.NATIONAL_PRODUCTION}/${id}`, data);

export const DeleteNationalProduction = (id: string | number) =>
  deleteRequest(`${APIROUTES.NATIONAL_PRODUCTION}/${id}`);
