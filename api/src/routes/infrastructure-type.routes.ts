import { Router } from 'express';

import { ROUTES } from '../constants';
import {
  createInfrastrutureType,
  createManyInfrastructureType,
  deleteInfrastructType,
  getAllInfrastructureType,
  getInfrastructureTypeById,
  updateInfrastructType,
} from '../controllers/infrastructure-type.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const infrastructureTypeRoutes = Router();

infrastructureTypeRoutes.get(ROUTES.infrastructureType, validateJWT, getAllInfrastructureType);
infrastructureTypeRoutes.get(
  `${ROUTES.infrastructureType}/:id`,
  validateJWT,
  getInfrastructureTypeById
);
infrastructureTypeRoutes.post(ROUTES.infrastructureType, validateJWT, createInfrastrutureType);
infrastructureTypeRoutes.post(
  `${ROUTES.infrastructureType}/many`,
  validateJWT,
  createManyInfrastructureType
);

infrastructureTypeRoutes.delete(
  `${ROUTES.infrastructureType}/:id`,
  validateJWT,
  roleProtect(['admin']),
  deleteInfrastructType
);

infrastructureTypeRoutes.patch(
  `${ROUTES.infrastructureType}/:id`,
  validateJWT,
  roleProtect(['admin']),
  updateInfrastructType
);

// eslint-disable-next-line import/prefer-default-export
export const infrastructureType = infrastructureTypeRoutes;
