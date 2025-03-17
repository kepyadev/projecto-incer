import { Router } from 'express';

import { ROUTES } from '../constants';
import { getAllHumanResourceByFazenda } from '../controllers/human-resource.controller';
import validateJWT from '../middleware/validateJwt';

const humanResourceRoutes = Router();

humanResourceRoutes.get(
  `${ROUTES.humanResouce}/fazenda/:fazenda`,
  validateJWT,
  getAllHumanResourceByFazenda
);

// eslint-disable-next-line import/prefer-default-export
export const humanResource = humanResourceRoutes;
