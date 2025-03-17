import { Router } from 'express';

import { ROUTES } from '../constants';
import {
  createCulturaType,
  createManyCulturaType,
  deleteCulturaType,
  getAllCultureType,
  getCultureTypeById,
  updateCultureType,
} from '../controllers/culture-type.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const CultureTypeRoutes = Router();

CultureTypeRoutes.get(ROUTES.cultureType, validateJWT, getAllCultureType);
CultureTypeRoutes.get(`${ROUTES.cultureType}/:id`, validateJWT, getCultureTypeById);
CultureTypeRoutes.post(ROUTES.cultureType, validateJWT, createCulturaType);
CultureTypeRoutes.post(`${ROUTES.cultureType}/many`, validateJWT, createManyCulturaType);

CultureTypeRoutes.delete(
  `${ROUTES.cultureType}/:id`,
  validateJWT,
  roleProtect(['admin']),
  deleteCulturaType
);

CultureTypeRoutes.patch(
  `${ROUTES.cultureType}/:id`,
  validateJWT,
  roleProtect(['admin']),
  updateCultureType
);

// eslint-disable-next-line import/prefer-default-export
export const cultureType = CultureTypeRoutes;
