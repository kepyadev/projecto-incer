import APIROUTES from '../../constants/api-routes';
import { IMachineType, IMachineTypeData } from '../../types';
import { MsgData } from '../../types/services';
import { HttpResponse, ListDataResponse } from '../services.types';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllMachineTypes = (): Promise<
  HttpResponse<MsgData<ListDataResponse<IMachineType[]>>>
> => getRequest(APIROUTES.MACHINE_TYPE);

export const getOneMachineType = (
  id: string
): Promise<HttpResponse<MsgData<IMachineType>>> =>
  getRequest(`${APIROUTES.MACHINE_TYPE}/${id}`);

export const createMachineType = (machineType: IMachineTypeData) =>
  postRequest(APIROUTES.MACHINE_TYPE, machineType);

export const createManyMachineType = (
  data: Record<string, unknown>[]
): Promise<
  HttpResponse<MsgData<ListDataResponse<ReadonlyArray<IMachineTypeData>>>>
> => postRequest(`${APIROUTES.MACHINE_TYPE}/many`, data);

export const updateMachineType = (machineType: IMachineTypeData, id: string) =>
  patchRequest(`${APIROUTES.MACHINE_TYPE}/${id}`, machineType);

export const deleteMachineType = (id: string | number) =>
  deleteRequest<MsgData<IMachineType>>(`${APIROUTES.MACHINE_TYPE}/${id}`);
