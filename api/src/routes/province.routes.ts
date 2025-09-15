import { Router } from 'express';

import { ROUTES } from '../constants';
import { getAllProvice, createProvince, deleteProvince } from '../controllers/province.controller';
import validateJwt from '../middleware/validateJwt';
 
const provinceRoutes = Router();

provinceRoutes.get(ROUTES.province, getAllProvice);
provinceRoutes.post(ROUTES.province, validateJwt, createProvince);
provinceRoutes.delete(`${ROUTES.province}/:id`, validateJwt, deleteProvince);

export const province = provinceRoutes;
