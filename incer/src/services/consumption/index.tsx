import APIROUTES from '../../constants/api-routes';
import { ImportedProductsTypes } from '../../constants/entities';
import {
  IImportedProducts,
  IImportedProductsData,
} from '../../types/ImportedProducts';
import { MsgData } from '../../types/services';
import { formatQuery } from '../service-helper';
import { AllowedQueryKeys, HttpResponse, ListDataResponse } from '../services.types';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../utils';

export const getAllConsumption = (
  params: AllowedQueryKeys = {}
): Promise<
  HttpResponse<MsgData<ListDataResponse<ReadonlyArray<ImportedProductsTypes>>>>
> =>
  // Promise.resolve(apiListResponse([cultureMock]));
  getRequest(`${APIROUTES.CONSUMPTION}?${formatQuery(params)}`);

export const getAllConsumptionById = (
  id: string
): Promise<HttpResponse<MsgData<IImportedProducts>>> =>
  getRequest(`${APIROUTES.CONSUMPTION}/${id}`);

export const CreateConsumption = (data: IImportedProductsData) =>
  postRequest(APIROUTES.CONSUMPTION, data);

export const CreateManyConsumption = (
  data: Record<string, unknown>[]
): Promise<
  HttpResponse<MsgData<ListDataResponse<ReadonlyArray<ImportedProductsTypes>>>>
> => postRequest(`${APIROUTES.CONSUMPTION}/many`, data);

export const UpdateConsumption = (data: IImportedProductsData, id: string) =>
  patchRequest(`${APIROUTES.CONSUMPTION}/${id}`, data);

export const DeleteConsumption = (id: string | number) =>
  deleteRequest(`${APIROUTES.CONSUMPTION}/${id}`);
