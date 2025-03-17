import { Router } from 'express';

import { ROUTES } from '../constants';
import { createManyAnimalType } from '../controllers/animal-type.controller';
import {
  CreateNationalProduction,
  DeleteNationalProduction,
  getAllNationalProduction,
  getAllNationalProductionById,
  UpdateNationalProduction,
} from '../controllers/national-production.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const nationalProductionRoutes = Router();

nationalProductionRoutes.get(ROUTES.nationalProduction, getAllNationalProduction);

nationalProductionRoutes.get(
  `${ROUTES.nationalProduction}/:id`,
  validateJWT,
  getAllNationalProductionById
);

nationalProductionRoutes.post(
  ROUTES.nationalProduction,
  validateJWT,
  roleProtect(['admin']),
  CreateNationalProduction
);

nationalProductionRoutes.post(
  `${ROUTES.nationalProduction}/many`,
  validateJWT,
  roleProtect(['admin']),
  createManyAnimalType
);

nationalProductionRoutes.delete(
  `${ROUTES.nationalProduction}/:id`,
  validateJWT,
  roleProtect(['admin']),
  DeleteNationalProduction
);

nationalProductionRoutes.patch(
  `${ROUTES.nationalProduction}/:id`,
  validateJWT,
  roleProtect(['admin']),
  UpdateNationalProduction
);

// eslint-disable-next-line import/prefer-default-export
export const nationalProduction = nationalProductionRoutes;
