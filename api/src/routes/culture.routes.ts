import { Router } from 'express';

import { ROUTES } from '../constants';
import {
  getAllCulture,
  getCultureByFazenda,
  getCultureById,
} from '../controllers/culture.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const CultureRoutes = Router();

CultureRoutes.get(ROUTES.culture, validateJWT, roleProtect(['technician', 'admin']), getAllCulture);
CultureRoutes.get(`${ROUTES.culture}/:id`, validateJWT, getCultureById);
CultureRoutes.get(
  `${ROUTES.culture}/fazenda/:fazenda`,
  validateJWT,
  roleProtect(['producer', 'cooperative', 'technician', 'admin']),
  getCultureByFazenda
);
// eslint-disable-next-line import/prefer-default-export
export const culture = CultureRoutes;
