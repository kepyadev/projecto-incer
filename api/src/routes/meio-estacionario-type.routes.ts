import { Router } from 'express';

import { ROUTES } from '../constants';
import {
  createManyMeioEstacionarioType,
  createMeioEstacionarioType,
  deleteMeioEstacionarioType,
  getAllMeioEstacionarioType,
  getMeioEstacionarioTypeById,
  updateMeioEstacionarioType,
} from '../controllers/meio-estacionario-type.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const meioEstacionarioTypeRoutes = Router();

meioEstacionarioTypeRoutes.get(
  ROUTES.meioEstacionarioType,
  validateJWT,
  getAllMeioEstacionarioType
);

meioEstacionarioTypeRoutes.get(
  `${ROUTES.meioEstacionarioType}/:id`,
  validateJWT,
  getMeioEstacionarioTypeById
);

meioEstacionarioTypeRoutes.post(
  ROUTES.meioEstacionarioType,
  validateJWT,
  roleProtect(['admin']),
  createMeioEstacionarioType
);

meioEstacionarioTypeRoutes.post(
  `${ROUTES.meioEstacionarioType}/many`,
  validateJWT,
  roleProtect(['admin']),
  createManyMeioEstacionarioType
);

meioEstacionarioTypeRoutes.delete(
  `${ROUTES.meioEstacionarioType}/:id`,
  validateJWT,
  roleProtect(['admin']),
  deleteMeioEstacionarioType
);

meioEstacionarioTypeRoutes.patch(
  `${ROUTES.meioEstacionarioType}/:id`,
  validateJWT,
  roleProtect(['admin']),
  updateMeioEstacionarioType
);
// eslint-disable-next-line import/prefer-default-export
export const meioEstacionarioType = meioEstacionarioTypeRoutes;
