import APIROUTES from '../../constants/api-routes';
import { IProvince } from '../../types';
import { MsgData } from '../../types/services';
import { ListDataResponse } from '../services.types';
import { getRequest } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const getAllProvinces = () =>
  getRequest<MsgData<ListDataResponse<IProvince[]>>>(APIROUTES.PROVINCE);
