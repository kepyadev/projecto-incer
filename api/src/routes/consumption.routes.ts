import { Router } from 'express';

import { ROUTES } from '../constants';
import {
  CreateImportedProducts,
  DeleteImportedProducts,
  getAllImportedProducts,
  UpdateImportedProducts,
} from '../controllers/consumption.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const importedProductRoutes = Router();

importedProductRoutes.get(ROUTES.consumption, getAllImportedProducts);

importedProductRoutes.get(`${ROUTES.consumption}/:id`, validateJWT, getAllImportedProducts);

importedProductRoutes.post(
  ROUTES.consumption,
  validateJWT,
  roleProtect(['admin']),
  CreateImportedProducts
);

importedProductRoutes.delete(
  `${ROUTES.consumption}/:id`,
  validateJWT,
  roleProtect(['admin']),
  DeleteImportedProducts
);

importedProductRoutes.patch(
  `${ROUTES.consumption}/:id`,
  validateJWT,
  roleProtect(['admin']),
  UpdateImportedProducts
);

// eslint-disable-next-line import/prefer-default-export
export const importedProduct = importedProductRoutes;
