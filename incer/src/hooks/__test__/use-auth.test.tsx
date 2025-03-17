// eslint-disable-next-line import/no-extraneous-dependencies
import { waitFor } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { act, renderHook } from '@testing-library/react-hooks';

import { User } from '../../constants/user';
import { authLogin, authSignUp, tokenVerify } from '../../services/auth';
import { getTokenFromLocalStorage } from '../../services/utils';
import { ICredentials, IUser, UserRole } from '../../types/user';
import { SignupFormData } from '../../views/auth/signup/form/signup.types';
import useAuth from '../use-auth';

const userExample: IUser = {
  [User.FirstName]: 'Zebedeu',
  [User.LastName]: 'Joaquim',
  [User.Phone]: 911000222,
  [User.Role]: UserRole.Producer,
};

const userSgnUpExample: SignupFormData = {
  [User.FirstName]: 'Zebedeu',
  [User.LastName]: 'Joaquim',
  [User.Phone]: 911000222,
  [User.Role]: UserRole.Producer,
  [User.Password]: '1234',
  [User.ConfirmPassword]: '1234',
};

jest.mock('../../services/auth');
jest.mock('../../services/utils');

describe('useAuth', () => {
  const makeSut = () => renderHook(() => useAuth());
  describe('USER STATE', () => {
    it('Return as expected', () => {
      const { result } = makeSut();
      expect(result.current.user).toBeNull();
    });

    it('set USER to different value, and returns it', () => {
      const { result } = makeSut();
      expect(result.current.user).toBeNull();

      act(() => {
        result.current.setUser(userExample);
      });

      expect(result.current.user).toBe(userExample);
    });
  });

  describe('LOADING STATE', () => {
    it('Return as expected', () => {
      const { result } = makeSut();

      expect(result.current.loading).toBeFalsy();
    });

    it('sets loading to a different value, and returns it', () => {
      const { result } = makeSut();

      act(() => {
        result.current.setLoading(true);
      });

      expect(result.current.loading).toBeTruthy();

      act(() => {
        result.current.setLoading(false);
      });

      expect(result.current.loading).toBeFalsy();
    });

    it('sets loading to the same value, and returns the same value ', () => {
      const { result } = makeSut();
      expect(result.current.loading).toBeFalsy();

      act(() => {
        result.current.setLoading(true);
      });
      expect(result.current.loading).toBeTruthy();

      act(() => {
        result.current.setLoading(true);
      });
      expect(result.current.loading).toBeTruthy();
    });
  });

  describe('HANDLELOGIN', () => {
    const credentials: ICredentials = {
      email: 'zebedeu@incer.ao',
      password: '1234',
    };

    it('Should call authLogin method', async () => {
      (authLogin as jest.Mock).mockResolvedValue({
        data: { payload: { data: userExample } },
      });
      const { result } = makeSut();
      act(() => {
        result.current.handleLogin(credentials);
      });

      await waitFor(() => {
        expect(authLogin).toBeCalledWith(credentials);
      });
    });

    it('Should return a user for valid credentials', async () => {
      (authLogin as jest.Mock).mockResolvedValue({
        data: { payload: { data: userExample } },
      });
      const { result } = makeSut();
      act(() => {
        result.current.handleLogin(credentials);
      });

      await waitFor(() => {
        expect(result.current.user).toStrictEqual({ data: userExample });
      });
    });

    it('Should return a null for invalid credentials', async () => {
      (authLogin as jest.Mock).mockResolvedValue({
        data: { payload: {}, msg: 'invalid credentials' },
      });
      const { result } = makeSut();
      act(() => {
        result.current.handleLogin({ email: 'zebedeu@jorge.com', password: '123' });
      });

      await waitFor(() => {
        expect(result.current.user).toBe(null);
      });
    });
  });

  describe('HANDLELOGOUT', () => {
    it('Should set user as NULL', () => {
      const { result } = makeSut();

      act(() => {
        result.current.setUser(userExample);
      });

      expect(result.current.user).toBe(userExample);

      act(() => {
        result.current.handleLogout();
      });

      expect(result.current.user).toBeNull();
    });
  });

  describe('GETAUTHDATA', () => {
    it('Shoul set user if token is valid', async () => {
      (getTokenFromLocalStorage as jest.Mock).mockReturnValue({
        token: 'token',
        user: userExample,
      });
      (tokenVerify as jest.Mock).mockResolvedValue({
        data: { payload: { data: userExample } },
      });
      const { result } = makeSut();

      await waitFor(() => {
        expect(result.current.user).toBe(userExample);
      });
    });

    it('Shoul set user as null if token isnt seted', async () => {
      (getTokenFromLocalStorage as jest.Mock).mockReturnValue(null);

      const { result } = makeSut();

      await waitFor(() => {
        expect(result.current.user).toBe(null);
      });
    });

    it('Shoul set user as null if token is seted but invalid', async () => {
      (getTokenFromLocalStorage as jest.Mock).mockReturnValue('token');
      (tokenVerify as jest.Mock).mockRejectedValue({});
      const { result } = makeSut();

      await waitFor(() => {
        expect(result.current.user).toBe(null);
      });
    });
  });

  describe('SIGNUP', () => {
    it('Should call authSignUp method', async () => {
      (authSignUp as jest.Mock).mockResolvedValue({});
      const { result } = makeSut();

      act(() => {
        result.current.handleSingup(userSgnUpExample);
      });

      await waitFor(() => {
        expect(authSignUp).toBeCalled();
      });
    });

    it('Should set user if successfull signup', async () => {
      (authSignUp as jest.Mock).mockResolvedValue({
        data: { payload: { data: userExample } },
      });
      const { result } = makeSut();

      act(() => {
        result.current.handleSingup(userSgnUpExample);
      });

      await waitFor(() => {
        expect(result.current.user).toStrictEqual({ data: userExample });
      });
    });

    it('Should set user null if happen an error signup', async () => {
      (authSignUp as jest.Mock).mockResolvedValue({});
      const { result } = makeSut();

      act(() => {
        result.current.setUser(userExample);
      });

      act(() => {
        result.current.handleSingup(userSgnUpExample);
      });

      await waitFor(() => {
        expect(result.current.user).toBe(null);
      });
    });
  });
});
