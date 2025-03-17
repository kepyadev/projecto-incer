import APIROUTES from '../../constants/api-routes';
import { IEquipamentoType, IEquipamentoTypeData } from '../../types';
import { MsgData } from '../../types/services';
import { HttpResponse, ListDataResponse } from '../services.types';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllEquipamentosType = (): Promise<
  HttpResponse<MsgData<ListDataResponse<ReadonlyArray<IEquipamentoType>>>>
> => getRequest(APIROUTES.EQUIPAMENTO_TYPE);

export const getOneEquipamentoType = (
  id: string
): Promise<HttpResponse<MsgData<IEquipamentoType>>> =>
  getRequest(`${APIROUTES.EQUIPAMENTO_TYPE}/${id}`);

export const createEquipamentoType = (data: IEquipamentoTypeData) =>
  postRequest(APIROUTES.EQUIPAMENTO_TYPE, data);

export const createManyEquipamentoType = (
  data: Record<string, unknown>[]
): Promise<
  HttpResponse<MsgData<ListDataResponse<ReadonlyArray<IEquipamentoType>>>>
> => postRequest(`${APIROUTES.EQUIPAMENTO_TYPE}/many`, data);

export const updateEquipamentoType = (data: IEquipamentoTypeData, id: string) =>
  patchRequest(`${APIROUTES.EQUIPAMENTO_TYPE}/${id}`, data);

export const deleteEquipamentoType = (id: string | number) =>
  deleteRequest(`${APIROUTES.EQUIPAMENTO_TYPE}/${id}`);
