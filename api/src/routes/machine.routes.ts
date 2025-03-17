import { Router } from 'express';

import { ROUTES } from '../constants';
import {
  createMachine,
  getAllMachines,
  getMachinesByFazenda,
} from '../controllers/machine.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const machineRoutes = Router();

machineRoutes.get(ROUTES.machine, validateJWT, roleProtect(['producer']), getAllMachines);
machineRoutes.get(`${ROUTES.machine}/fazenda/:fazenda`, validateJWT, getMachinesByFazenda);
machineRoutes.post(ROUTES.machine, validateJWT, roleProtect(['producer']), createMachine);

// eslint-disable-next-line import/prefer-default-export
export const machine = machineRoutes;
