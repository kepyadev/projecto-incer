import APIROUTES from '../../constants/api-routes';
import { IInfraestruturaType, IInfraestruturaTypeDTO } from '../../types';
import { MsgData } from '../../types/services';
import { HttpResponse, ListDataResponse } from '../services.types';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../utils';

export const getAllInfraestruturaType = (): Promise<
  HttpResponse<MsgData<ListDataResponse<ReadonlyArray<IInfraestruturaType>>>>
> => getRequest(APIROUTES.INFRAESTRUTURA_TYPE);

export const getOneInfraestruturaType = (
  id: string
): Promise<HttpResponse<MsgData<IInfraestruturaType>>> =>
  getRequest(`${APIROUTES.INFRAESTRUTURA_TYPE}/${id}`);

export const createInfraestruturaType = (data: IInfraestruturaTypeDTO) =>
  postRequest(APIROUTES.INFRAESTRUTURA_TYPE, data);

export const createManyInfraestruturaType = (
  data: Record<string, unknown>[]
): Promise<
  HttpResponse<MsgData<ListDataResponse<ReadonlyArray<IInfraestruturaTypeDTO>>>>
> => postRequest(`${APIROUTES.INFRAESTRUTURA_TYPE}/many`, data);

export const updateInfraestruturaType = (data: IInfraestruturaTypeDTO, id: string) =>
  patchRequest(`${APIROUTES.INFRAESTRUTURA_TYPE}/${id}`, data);

export const deleteInfraestruturaType = (id: string | number) =>
  deleteRequest(`${APIROUTES.INFRAESTRUTURA_TYPE}/${id}`);
