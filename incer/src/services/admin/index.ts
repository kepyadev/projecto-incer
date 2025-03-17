import APIROUTES from '../../constants/api-routes';
import { MsgData } from '../../types/services';
import { adminDTO, IUser } from '../../types/user';
import { postRequest } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const createAdmin = (data: adminDTO) =>
  postRequest<MsgData<IUser>>(APIROUTES.ADMIN, data);
