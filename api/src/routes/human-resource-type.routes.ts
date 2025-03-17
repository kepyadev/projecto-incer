import { Router } from 'express';

import { ROUTES } from '../constants';
import {
  createHumanResourceType,
  createManyHumanResourceType,
  deleteHumanResourceType,
  getAllHumanResourceType,
  getHumanResourceTypeById,
  updateHumanResourceType,
} from '../controllers/human-resource-type.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const humanResourceTypeRoutes = Router();

humanResourceTypeRoutes.get(ROUTES.humanResouceType, validateJWT, getAllHumanResourceType);
humanResourceTypeRoutes.get(
  `${ROUTES.humanResouceType}/:id`,
  validateJWT,
  getHumanResourceTypeById
);
humanResourceTypeRoutes.post(ROUTES.humanResouceType, validateJWT, createHumanResourceType);
humanResourceTypeRoutes.post(
  `${ROUTES.humanResouceType}/many`,
  validateJWT,
  createManyHumanResourceType
);

humanResourceTypeRoutes.delete(
  `${ROUTES.humanResouceType}/:id`,
  validateJWT,
  roleProtect(['admin']),
  deleteHumanResourceType
);

humanResourceTypeRoutes.patch(
  `${ROUTES.humanResouceType}/:id`,
  validateJWT,
  roleProtect(['admin']),
  updateHumanResourceType
);
// eslint-disable-next-line import/prefer-default-export
export const humanResourceType = humanResourceTypeRoutes;
