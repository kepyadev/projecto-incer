import { Router } from 'express';

import { ROUTES } from '../constants';
import { getInfrastructureByFazenda } from '../controllers/infrastructure.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const infrastructureRoutes = Router();

infrastructureRoutes.get(
  `${ROUTES.infrastructure}/fazenda/:fazenda`,
  validateJWT,
  roleProtect(['producer', 'cooperative', 'technician', 'admin']),
  getInfrastructureByFazenda
);

// eslint-disable-next-line import/prefer-default-export
export const infrastructure = infrastructureRoutes;
