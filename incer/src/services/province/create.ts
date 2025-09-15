import APIROUTES from '../../constants/api-routes';
import { IProvince } from '../../types';
import { MsgData } from '../../types/services';
import { postRequest } from '../utils';

const createProvince = (province: { description: string; country: string }) =>
  postRequest<MsgData<IProvince>>(APIROUTES.PROVINCE, province);

export default createProvince;
