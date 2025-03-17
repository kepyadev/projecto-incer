import { Router } from 'express';

import { ROUTES } from '../constants';
import {
  login,
  logout,
  resetPassword,
  resetPasswordUpdate,
  signup,
  tokenVerify,
} from '../controllers/auth.controller';
import validateJWT from '../middleware/validateJwt';

const authRoutes = Router();

authRoutes.post(ROUTES.resetPassword, resetPassword);

authRoutes.post(`${ROUTES.resetPasswordUpdate}/:token`, resetPasswordUpdate);

authRoutes.post(ROUTES.signin, login);

authRoutes.post(ROUTES.logout, validateJWT, logout);

authRoutes.get(ROUTES.tokenVerify, tokenVerify);

authRoutes.post(ROUTES.signup, signup);

// eslint-disable-next-line import/prefer-default-export
export const auth = authRoutes;
