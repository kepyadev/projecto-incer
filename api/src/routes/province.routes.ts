import { Router } from 'express';

import { ROUTES } from '../constants';
import { getAllProvice } from '../controllers/province.controller';

const provinceRoutes = Router();

provinceRoutes.get(ROUTES.province, getAllProvice);

// eslint-disable-next-line import/prefer-default-export
export const province = provinceRoutes;
