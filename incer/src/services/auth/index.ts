import APIROUTES from '../../constants/api-routes';
import { MsgData } from '../../types/services';
import { ICredentials, IUser, UserDTO } from '../../types/user';
import { getRequest, postRequest } from '../utils';

export const authLogin = (credential: ICredentials) =>
  postRequest<
    MsgData<{ token: string; cooperative?: any; producer?: any; user: IUser }>
  >(APIROUTES.LOGIN, credential);

export const resetPassword = (email: string) =>
  postRequest<MsgData<any>>(APIROUTES.RESET_PASSWORD, { email });

export const resetPasswordUpdate = (password: string, token: string) =>
  postRequest<MsgData<any>>(`${APIROUTES.RESET_PASSWORD_UPDATE}/${token}`, {
    password,
  });

export const authLogout = () => postRequest<MsgData<any>>(APIROUTES.LOGOUT);

export const authSignUp = (consultant: UserDTO) =>
  postRequest<
    MsgData<{ token: string; cooperative?: any; producer?: any; user: IUser }>
  >(APIROUTES.SIGNUP, consultant);

export const tokenVerify = (token: string) =>
  getRequest<MsgData<IUser>>(`${APIROUTES.TOKEN_VERIFY}?token=${token}`);
