import { Router } from 'express';

import { ROUTES } from '../constants';
import {
  createEquipamentoType,
  createManyEquipamentoType,
  deleteEquipamentoType,
  getAllEquipamentoType,
  getEquipamentoTypeById,
  updateEquipamentoType,
} from '../controllers/equipamento-type.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const equipamentoTypeRoutes = Router();

equipamentoTypeRoutes.get(ROUTES.equipamentoType, validateJWT, getAllEquipamentoType);
equipamentoTypeRoutes.get(`${ROUTES.equipamentoType}/:id`, validateJWT, getEquipamentoTypeById);
equipamentoTypeRoutes.post(ROUTES.equipamentoType, validateJWT, createEquipamentoType);
equipamentoTypeRoutes.post(
  `${ROUTES.equipamentoType}/many`,
  validateJWT,
  createManyEquipamentoType
);

equipamentoTypeRoutes.delete(
  `${ROUTES.equipamentoType}/:id`,
  validateJWT,
  roleProtect(['admin']),
  deleteEquipamentoType
);

equipamentoTypeRoutes.patch(
  `${ROUTES.equipamentoType}/:id`,
  validateJWT,
  roleProtect(['admin']),
  updateEquipamentoType
);
// eslint-disable-next-line import/prefer-default-export
export const equipamentoType = equipamentoTypeRoutes;
