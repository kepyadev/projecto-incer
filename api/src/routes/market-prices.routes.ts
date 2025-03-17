import { Router } from 'express';

import { ROUTES } from '../constants';
import {
  CreateNationalMarketPrice,
  DeleteNationalMarketPrice,
  getAllNationalMarketPrice,
  getAllNationalMarketPriceById,
  UpdateNationalMarketPrice,
} from '../controllers/market-price.controller';
import roleProtect from '../middleware/role-protect';
import validateJWT from '../middleware/validateJwt';

const nationalMarketPriceRoutes = Router();

nationalMarketPriceRoutes.get(ROUTES.marketPrices, getAllNationalMarketPrice);

nationalMarketPriceRoutes.get(
  `${ROUTES.marketPrices}/:id`,
  validateJWT,
  getAllNationalMarketPriceById
);

nationalMarketPriceRoutes.post(
  ROUTES.marketPrices,
  validateJWT,
  roleProtect(['admin']),
  CreateNationalMarketPrice
);

nationalMarketPriceRoutes.delete(
  `${ROUTES.marketPrices}/:id`,
  validateJWT,
  roleProtect(['admin']),
  DeleteNationalMarketPrice
);

nationalMarketPriceRoutes.patch(
  `${ROUTES.marketPrices}/:id`,
  validateJWT,
  roleProtect(['admin']),
  UpdateNationalMarketPrice
);

// eslint-disable-next-line import/prefer-default-export
export const nationalMarketPrice = nationalMarketPriceRoutes;
