import APIROUTES from '../../constants/api-routes';
import { MsgData } from '../../types/services';
import { IUser, partnerDTO } from '../../types/user';
import { formatQuery } from '../service-helper';
import { AllowedQueryKeys, ListDataResponse } from '../services.types';
import { getRequest, postRequest } from '../utils';

export const getAllPartner = (params: AllowedQueryKeys) =>
  getRequest<MsgData<ListDataResponse<IUser[]>>>(
    `${APIROUTES.PARTNER}?${formatQuery(params)}`
  );

export const createPartner = (data: partnerDTO) =>
  postRequest<MsgData<IUser>>(APIROUTES.PARTNER, data);
