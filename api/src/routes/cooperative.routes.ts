import { Router } from 'express';

import { ROUTES } from '../constants';
import {
  createCooperative,
  createProducerCooperative,
  getAllCooperative,
  getAllCultures,
  getAllFazendasOfMyCooperative,
  getAllProducersByCooperative,
  getAllProducersOfMyCooperative,
  getCooperativeById,
  getCooperativeResume,
  getOneProducerByCooperative,
} from '../controllers/cooperative.controller';
import { getAllFazenda } from '../controllers/fazenda.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const cooperativeRoutes = Router();

cooperativeRoutes.get(
  ROUTES.cooperative,
  validateJWT,
  roleProtect(['technician', 'admin']),
  getAllCooperative
);

cooperativeRoutes.get(
  `${ROUTES.cooperative}/fazenda`,
  validateJWT,
  roleProtect(['cooperative']),
  getAllFazendasOfMyCooperative
);

cooperativeRoutes.get(
  `${ROUTES.cooperative}/resume`,
  validateJWT,
  roleProtect(['cooperative']),
  getCooperativeResume
);

cooperativeRoutes.get(
  `${ROUTES.cooperative}/producer`,
  validateJWT,
  roleProtect(['cooperative']),
  getAllProducersOfMyCooperative
);
cooperativeRoutes.post(
  `${ROUTES.cooperative}/:cooperative/producer`,
  validateJWT,
  roleProtect(['cooperative']),
  createProducerCooperative
);

cooperativeRoutes.get(
  `${ROUTES.cooperative}/:id`,
  validateJWT,
  roleProtect(['technician', 'cooperative', 'admin']),
  getCooperativeById
);

cooperativeRoutes.post(
  ROUTES.cooperative,
  validateJWT,
  roleProtect(['technician']),
  createCooperative
);

cooperativeRoutes.get(
  `${ROUTES.cooperative}/:cooperative/culture`,
  validateJWT,
  roleProtect(['cooperative']),
  getAllCultures
);

cooperativeRoutes.get(
  `${ROUTES.cooperative}/:cooperative/fazenda`,
  validateJWT,
  roleProtect(['cooperative']),
  getAllFazenda
);

cooperativeRoutes.get(
  `${ROUTES.cooperative}/:cooperative/producer/:producer`,
  validateJWT,
  roleProtect(['cooperative', 'technician']),
  getOneProducerByCooperative
);

cooperativeRoutes.get(
  `${ROUTES.cooperative}/:cooperative/producer`,
  validateJWT,
  roleProtect(['technician', 'admin']),
  getAllProducersByCooperative
);

// eslint-disable-next-line import/prefer-default-export
export const cooperative = cooperativeRoutes;
