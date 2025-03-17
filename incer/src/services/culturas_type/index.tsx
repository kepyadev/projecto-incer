import APIROUTES from '../../constants/api-routes';
import { ICultureType, ICultureTypeData } from '../../types/culture';
import { MsgData } from '../../types/services';
import { HttpResponse, ListDataResponse } from '../services.types';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../utils';

export const getAllCulturasTypes = (): Promise<
  HttpResponse<MsgData<ListDataResponse<ICultureType[]>>>
> => getRequest<MsgData<ListDataResponse<ICultureType[]>>>(APIROUTES.CULTURE_TYPE);

export const getOneCultureType = (
  id: string
): Promise<HttpResponse<MsgData<ICultureType>>> =>
  getRequest<MsgData<ICultureType>>(`${APIROUTES.CULTURE_TYPE}/${id}`);

export const createCultureType = (cultureType: ICultureTypeData) =>
  postRequest(APIROUTES.CULTURE_TYPE, cultureType);

export const createManyCultureType = (
  data: Record<string, unknown>[]
): Promise<
  HttpResponse<MsgData<ListDataResponse<ReadonlyArray<ICultureTypeData>>>>
> => postRequest(`${APIROUTES.CULTURE_TYPE}/many`, data);

export const updateCultureType = (cultureType: ICultureTypeData, id: string) =>
  patchRequest(`${APIROUTES.CULTURE_TYPE}/${id}`, cultureType);

export const deleteCultureType = (id: string | number) =>
  deleteRequest<MsgData<ICultureType>>(`${APIROUTES.CULTURE_TYPE}/${id}`);
