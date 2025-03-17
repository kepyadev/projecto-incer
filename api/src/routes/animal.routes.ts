import { Router } from 'express';

import { ROUTES } from '../constants';
import { getAnimalByFazenda } from '../controllers/animal.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const AnimalRoutes = Router();

AnimalRoutes.get(
  `${ROUTES.animal}/fazenda/:fazenda`,
  validateJWT,
  roleProtect(['producer', 'cooperative', 'technician', 'admin']),
  getAnimalByFazenda
);

// eslint-disable-next-line import/prefer-default-export
export const animal = AnimalRoutes;
