import { Router } from 'express';

import { ROUTES } from '../constants';
import { createPartner, getAllPartner } from '../controllers/partner.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const partnerRoutes = Router();

partnerRoutes.get(ROUTES.partner, validateJWT, roleProtect(['admin']), getAllPartner);
partnerRoutes.post(ROUTES.partner, validateJWT, roleProtect(['admin']), createPartner);

// eslint-disable-next-line import/prefer-default-export
export const partner = partnerRoutes;
