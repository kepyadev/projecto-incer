import APIROUTES from '../../constants/api-routes';
import { HumanResourceTypeDTO, IHumanResourceType } from '../../types';
import { MsgData } from '../../types/services';
import { HttpResponse, ListDataResponse } from '../services.types';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllHumanResourcesType = (): Promise<
  HttpResponse<MsgData<ListDataResponse<IHumanResourceType[]>>>
> => getRequest(APIROUTES.HUMAN_RESOURCE_TYPE);

export const getOneHumanResourceType = (
  id: string
): Promise<HttpResponse<MsgData<IHumanResourceType>>> =>
  getRequest(`${APIROUTES.HUMAN_RESOURCE_TYPE}/${id}`);

export const createHumanResourceType = (data: HumanResourceTypeDTO) =>
  postRequest(APIROUTES.HUMAN_RESOURCE_TYPE, data);

export const createManyHumanResourceType = (
  data: Record<string, unknown>[]
): Promise<
  HttpResponse<MsgData<ListDataResponse<ReadonlyArray<HumanResourceTypeDTO>>>>
> => postRequest(`${APIROUTES.HUMAN_RESOURCE_TYPE}/many`, data);

export const updateHumanResourceType = (data: HumanResourceTypeDTO, id: string) =>
  patchRequest(`${APIROUTES.HUMAN_RESOURCE_TYPE}/${id}`, data);

export const deleteHumanResourceType = (id: string | number) =>
  deleteRequest(`${APIROUTES.HUMAN_RESOURCE_TYPE}/${id}`);
