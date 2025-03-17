import { Router } from 'express';

import { ROUTES } from '../constants';
import {
  createProducerWithCooperative,
  createProducerWithoutCooperative,
  createTechnician,
  getAllTechnician,
  getTechnicianResume,
} from '../controllers/technician.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const technicianRoutes = Router();

technicianRoutes.get(ROUTES.technician, validateJWT, roleProtect(['admin']), getAllTechnician);
technicianRoutes.get(
  `${ROUTES.technician}/resume`,
  validateJWT,
  roleProtect(['technician', 'admin']),
  getTechnicianResume
);
technicianRoutes.post(ROUTES.technician, validateJWT, roleProtect(['admin']), createTechnician);
technicianRoutes.post(
  `${ROUTES.technician}/producer`,
  validateJWT,
  roleProtect(['admin', 'technician']),
  createProducerWithCooperative
);
technicianRoutes.post(
  `${ROUTES.technician}/producer/without-cooperative`,
  validateJWT,
  roleProtect(['admin', 'technician']),
  createProducerWithoutCooperative
);

// eslint-disable-next-line import/prefer-default-export
export const technician = technicianRoutes;
