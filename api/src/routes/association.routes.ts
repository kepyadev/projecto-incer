import { Router } from 'express';

import { ROUTES } from '../constants';
import getAllAssociation from '../controllers/association.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const associationRoutes = Router();

associationRoutes.get(
  ROUTES.association,
  validateJWT,
  roleProtect(['technician', 'admin']),
  getAllAssociation
);

// eslint-disable-next-line import/prefer-default-export
export const association = associationRoutes;
