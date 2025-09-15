import { Router } from 'express';

import { ROUTES } from '../constants';
import { getAllCounty, createCounty } from '../controllers/county.controller';
import validateJwt from '../middleware/validateJwt';

const countyRoutes = Router();

countyRoutes.get(ROUTES.county, getAllCounty);
countyRoutes.post(ROUTES.county, validateJwt, createCounty);

export const county = countyRoutes;
