import { Router } from 'express';

import { ROUTES } from '../constants';
import {
  createMachineTypes,
  createManyMachineType,
  deleteMachineType,
  getAllMachineTypes,
  getMachineTypesById,
  updateMachineType,
} from '../controllers/machine-type.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const machineTypeRoutes = Router();

machineTypeRoutes.get(ROUTES.machineType, validateJWT, getAllMachineTypes);
machineTypeRoutes.get(`${ROUTES.machineType}/:id`, validateJWT, getMachineTypesById);
machineTypeRoutes.post(ROUTES.machineType, validateJWT, createMachineTypes);
machineTypeRoutes.post(`${ROUTES.machineType}/many`, validateJWT, createManyMachineType);

machineTypeRoutes.delete(
  `${ROUTES.machineType}/:id`,
  validateJWT,
  roleProtect(['admin']),
  deleteMachineType
);

machineTypeRoutes.patch(
  `${ROUTES.machineType}/:id`,
  validateJWT,
  roleProtect(['admin']),
  updateMachineType
);

// eslint-disable-next-line import/prefer-default-export
export const machineType = machineTypeRoutes;
