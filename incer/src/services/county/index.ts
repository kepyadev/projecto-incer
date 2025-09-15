import APIROUTES from '../../constants/api-routes';
import { ICounty } from '../../types';
import { MsgData } from '../../types/services';
import { ListDataResponse } from '../services.types';
import { getRequest, postRequest } from '../utils';

export const getAllCounties = () =>
  getRequest<MsgData<ListDataResponse<ICounty[]>>>(APIROUTES.COUNTY);

export const getCountiesByProvince = (provinceId: string) =>
  getRequest<MsgData<ListDataResponse<ICounty[]>>>(`${APIROUTES.COUNTY}?province=${provinceId}`);

export const createCounty = (county: { description: string; province: string }) =>
  postRequest<MsgData<ICounty>>(APIROUTES.COUNTY, county);
