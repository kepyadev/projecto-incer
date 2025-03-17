import APIROUTES from '../../constants/api-routes';
import { User } from '../../constants/user';
import { IUser, UserRole } from '../../types/user';
import { getRequest, postRequest } from '../utils';
import { authLogin, authSignUp, tokenVerify } from '.';

jest.mock('../utils');
describe('AUTH SERVICE', () => {
  const userMock: IUser = {
    [User.Email]: 'zebedeu@incer.ao',
    [User.Phone]: 900222777,
    [User.FirstName]: 'Zebedeu',
    [User.LastName]: 'Joaquim',
    [User.Password]: '1234',
    [User.Role]: UserRole.Producer,
  };

  describe('LOGIN', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    const credentials = { email: 'zebedeu@incer.ao', password: '1234' };
    const makeSut = () => authLogin(credentials);

    it('Should call postRequest with rigth params', async () => {
      (postRequest as jest.Mock).mockResolvedValue({
        token: 'token',
        user: { [User.FirstName]: 'Zebedeu' },
      });
      await makeSut();

      expect(postRequest).toBeCalledWith(APIROUTES.LOGIN, credentials);
    });
  });
  describe('SIGNUP', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    const makeSut = () => authSignUp(userMock);

    it('Should call postRequest with rigth params', async () => {
      (postRequest as jest.Mock).mockResolvedValue({
        token: 'token',
        user: userMock,
      });
      await makeSut();

      expect(postRequest).toBeCalledWith(APIROUTES.SIGNUP, userMock);
    });
  });
  describe('TOKEN VERIFY', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    const makeSut = () => tokenVerify('token');

    it('Should call postRequest with rigth params', async () => {
      (getRequest as jest.Mock).mockResolvedValue({
        data: { payload: {}, msg: 'Token validado' },
      });
      await makeSut();

      expect(getRequest).toBeCalledWith(`${APIROUTES.TOKEN_VERIFY}?token=token`);
    });
  });
});
