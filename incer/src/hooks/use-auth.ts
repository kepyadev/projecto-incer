import { useEffect, useState } from 'react';

import {
  authLogin,
  authLogout,
  authSignUp,
  tokenVerify,
} from '../services/auth/index';
import { getTokenFromLocalStorage } from '../services/utils';
import { ICooperativeDTO } from '../types/cooperative';
import { IUser, UserDTO } from '../types/user';
import { LoginFormData } from '../views/auth/login/login.types';

const saveAuthDataOnLocalStorage = (data: {
  token: string;
  producer?: any;
  cooperative?: string;
  user: IUser;
}) => {
  localStorage.setItem('auth', JSON.stringify(data));
};

const removeAuthData = () => {
  localStorage.removeItem('auth');
};

const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [cooperative, setCooperative] = useState<ICooperativeDTO | null>(null);
  const [loading, setLoading] = useState(true);

  const saveUser = (userObject: {
    token: string;
    producer?: any;
    cooperative?: ICooperativeDTO | any;
    user: IUser;
  }) => {
    saveAuthDataOnLocalStorage(userObject);
    setUser(userObject.user);
    setCooperative(userObject?.cooperative);
  };

  const handleLogin = async (credentials: LoginFormData) => {
    const { data } = await authLogin(credentials);

    if (data?.payload) {
      const userData = data!.payload;
      saveUser(userData);
      return userData.user;
    }
    return null;
  };

  const handleSingup = async (userObject: UserDTO) => {
    const { data } = await authSignUp(userObject);
    if (data && data.payload) {
      const userData = data.payload;
      saveUser(userData);
      return userData.user;
    }
    handleLogout();
    return null;
  };

  const handleLogout = async () => {
    try {
      await authLogout();
      setUser(null);
      removeAuthData();
    } catch (error) {
      console.log('Ocorreu algum erro ao fazer o log out');
    }
  };

  const getAuthData = async () => {
    setLoading(true);
    const localStorageData = getTokenFromLocalStorage();
    if (localStorageData && localStorageData.token && localStorageData?.user) {
      const { token, user: userLocalStorage } = localStorageData;
      try {
        await tokenVerify(token);
        // setUser(userLocalStorage);
        // console.log('REMOVE UP LINE', token);
        if (!user) setUser(userLocalStorage);
      } catch (error) {
        handleLogout();
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setUser(null);
    }
  };

  useEffect(() => {
    getAuthData().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isAuthenticated = !!user;
  return {
    user,
    cooperative,
    setUser,
    loading,
    setLoading,
    handleLogin,
    handleLogout,
    isAuthenticated,
    handleSingup,
  };
};

export default useAuth;
