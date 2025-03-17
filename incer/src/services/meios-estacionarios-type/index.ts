import APIROUTES from '../../constants/api-routes';
import { IMeioEstacionarioType, MeioEstacionarioTypeDTO } from '../../types';
import { MsgData } from '../../types/services';
import { HttpResponse, ListDataResponse } from '../services.types';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllMeiosEstacionariosType = (): Promise<
  HttpResponse<MsgData<ListDataResponse<IMeioEstacionarioType[]>>>
> => getRequest(APIROUTES.MEIO_ESTACIONARIO_TYPE);

export const getOneMeiosEstacionariosType = (
  id: string
): Promise<HttpResponse<MsgData<IMeioEstacionarioType>>> =>
  getRequest(`${APIROUTES.MEIO_ESTACIONARIO_TYPE}/${id}`);

export const createMeioEstacionarioTYpe = (data: MeioEstacionarioTypeDTO) =>
  postRequest(APIROUTES.MEIO_ESTACIONARIO_TYPE, data);

export const createManyMeioEstacionarioType = (
  data: Record<string, unknown>[]
): Promise<
  HttpResponse<MsgData<ListDataResponse<ReadonlyArray<MeioEstacionarioTypeDTO>>>>
> => postRequest(`${APIROUTES.MEIO_ESTACIONARIO_TYPE}/many`, data);

export const updateMeioEstacionarioType = (
  data: MeioEstacionarioTypeDTO,
  id: string
) => patchRequest(`${APIROUTES.MEIO_ESTACIONARIO_TYPE}/${id}`, data);

export const deleteMeioEstacionarioType = (
  id: string | number
): Promise<HttpResponse<MsgData<IMeioEstacionarioType>>> =>
  deleteRequest(`${APIROUTES.MEIO_ESTACIONARIO_TYPE}/${id}`);
