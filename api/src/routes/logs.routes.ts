import { Router } from 'express';

import { ROUTES } from '../constants';
import { getAllLogs } from '../controllers/logs.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const logRoutes = Router();

logRoutes.get(ROUTES.logs, validateJWT, roleProtect(['root']), getAllLogs);

// eslint-disable-next-line import/prefer-default-export
export const log = logRoutes;
