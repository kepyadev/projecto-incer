import { Router } from 'express';

import { ROUTES } from '../constants';
import { getAllCountry } from '../controllers/country.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const countryRoutes = Router();

countryRoutes.get(ROUTES.country, validateJWT, roleProtect(['producer']), getAllCountry);

// eslint-disable-next-line import/prefer-default-export
export const country = countryRoutes;
