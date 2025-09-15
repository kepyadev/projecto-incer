import APIROUTES from '../../constants/api-routes';
import { IProvince } from '../../types';
import { MsgData } from '../../types/services';
import { ListDataResponse } from '../services.types';
import { getRequest, postRequest, deleteRequest } from '../utils';

export const getAllProvinces = () =>
  getRequest<MsgData<ListDataResponse<IProvince[]>>>(APIROUTES.PROVINCE);

export const createProvince = (province: { description: string; country: string }) =>
  postRequest<MsgData<IProvince>>(APIROUTES.PROVINCE, province);

export const deleteProvince = (id: string) =>
  deleteRequest(`${APIROUTES.PROVINCE}/${id}`);

export default getAllProvinces;
