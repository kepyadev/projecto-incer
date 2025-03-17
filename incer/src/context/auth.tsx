import React, { createContext, FC } from 'react';

import Loading from '../components/Loading';
import useAuth from '../hooks/use-auth';
import { ICooperativeDTO } from '../types/cooperative';
import { IUser, UserDTO } from '../types/user';
import { LoginFormData } from '../views/auth/login/login.types';

export interface AuthContextData {
  authenticated: boolean;
  handleLogin(crendential: LoginFormData): Promise<IUser | null>;
  handleLogout(): void;
  handleSingup(userObject: UserDTO): Promise<IUser | null>;
  user: IUser | null;
  cooperative: ICooperativeDTO | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData | null>(null);

// eslint-disable-next-line react/prop-types
const AuthProvider: FC = ({ children }) => {
  const {
    loading,
    user,
    cooperative,
    handleLogin,
    handleLogout,
    isAuthenticated,
    handleSingup,
  } = useAuth();

  if (loading) return <Loading />;

  return (
    <AuthContext.Provider
      value={{
        authenticated: isAuthenticated,
        cooperative,
        user,
        handleLogin,
        handleLogout,
        handleSingup,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
