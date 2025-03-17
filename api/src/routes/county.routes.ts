import { Router } from 'express';

import { ROUTES } from '../constants';
import { getAllCounty } from '../controllers/county.controller';

const countyRoutes = Router();

countyRoutes.get(ROUTES.county, getAllCounty);

// eslint-disable-next-line import/prefer-default-export
export const county = countyRoutes;
