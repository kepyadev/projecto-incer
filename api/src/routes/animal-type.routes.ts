import { Router } from 'express';

import { ROUTES } from '../constants';
import {
  createAnimalType,
  createManyAnimalType,
  deleteAnimalType,
  getAllAnimalType,
  getAnimalTypeById,
  updateAnimalType,
} from '../controllers/animal-type.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const animalTypeRoutes = Router();

animalTypeRoutes.get(ROUTES.animalType, validateJWT, getAllAnimalType);

animalTypeRoutes.get(`${ROUTES.animalType}/:id`, validateJWT, getAnimalTypeById);

animalTypeRoutes.post(ROUTES.animalType, validateJWT, roleProtect(['admin']), createAnimalType);

animalTypeRoutes.post(
  `${ROUTES.animalType}/many`,
  validateJWT,
  roleProtect(['admin']),
  createManyAnimalType
);

animalTypeRoutes.delete(
  `${ROUTES.animalType}/:id`,
  validateJWT,
  roleProtect(['admin']),
  deleteAnimalType
);

animalTypeRoutes.patch(
  `${ROUTES.animalType}/:id`,
  validateJWT,
  roleProtect(['admin']),
  updateAnimalType
);

// eslint-disable-next-line import/prefer-default-export
export const animalType = animalTypeRoutes;
