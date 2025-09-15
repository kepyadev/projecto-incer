import { Router } from 'express';

import { ROUTES } from '../constants';
import { getAllCounty, createCounty, deleteCounty } from '../controllers/county.controller';
import validateJwt from '../middleware/validateJwt';

const countyRoutes = Router();

countyRoutes.get(ROUTES.county, getAllCounty);
countyRoutes.post(ROUTES.county, validateJwt, createCounty);
countyRoutes.delete(`${ROUTES.county}/:id`, validateJwt, deleteCounty);

export const county = countyRoutes;
