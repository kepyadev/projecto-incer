import { Router } from 'express';

import { ROUTES } from '../constants';
import {
  getAllEquipamentos,
  getEquipamentosByFazenda,
} from '../controllers/equipamento.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const equipamentoRoutes = Router();

equipamentoRoutes.get(
  ROUTES.equipamento,
  validateJWT,
  roleProtect(['producer']),
  getAllEquipamentos
);

equipamentoRoutes.get(
  `${ROUTES.equipamento}/fazenda/:fazenda`,
  validateJWT,
  getEquipamentosByFazenda
);

// eslint-disable-next-line import/prefer-default-export
export const equipamento = equipamentoRoutes;
