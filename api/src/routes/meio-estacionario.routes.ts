import { Router } from 'express';

import { ROUTES } from '../constants';
import {
  createMeioEstacionario,
  deleteMeioEstacionario,
  getAllMeioEstacionario,
  getMeioEstacionarioByFazenda,
  getMeioEstacionarioById,
} from '../controllers/meio-estacionario.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const MeioEstacionarioRoutes = Router();

MeioEstacionarioRoutes.get(ROUTES.meioEstacionario, validateJWT, getAllMeioEstacionario);

MeioEstacionarioRoutes.get(
  `${ROUTES.meioEstacionario}/fazenda/:fazenda`,
  validateJWT,
  getMeioEstacionarioByFazenda
);

MeioEstacionarioRoutes.get(`${ROUTES.meioEstacionario}/:id`, validateJWT, getMeioEstacionarioById);

MeioEstacionarioRoutes.post(
  ROUTES.meioEstacionario,
  validateJWT,
  roleProtect(['admin']),
  createMeioEstacionario
);

MeioEstacionarioRoutes.delete(
  `${ROUTES.meioEstacionario}/:id`,
  validateJWT,
  roleProtect(['admin']),
  deleteMeioEstacionario
);
// eslint-disable-next-line import/prefer-default-export
export const MeioEstacionario = MeioEstacionarioRoutes;
