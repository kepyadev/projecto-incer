import { Router } from 'express';

import { ROUTES } from '../constants';
import { createAdmin } from '../controllers/admin.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const adminRoutes = Router();

adminRoutes.post(ROUTES.admin, validateJWT, roleProtect(['root']), createAdmin);

// eslint-disable-next-line import/prefer-default-export
export const admin = adminRoutes;
