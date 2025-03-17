import APIROUTES from '../../constants/api-routes';
import { MsgData } from '../../types/services';
import { IUser } from '../../types/user';
import { HttpResponse, ListDataResponse } from '../services.types';
import { getRequest, patchRequest } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllUsers = (): Promise<
  HttpResponse<MsgData<ListDataResponse<IUser>>>
> => getRequest(APIROUTES.USERS);

export const updateUserById = (id: string, data: any) =>
  patchRequest(`${APIROUTES.USERS}/${id}`, data);
