import { Router } from 'express';

import { ROUTES } from '../constants';
import { getAllUsers, updateUserById, uploadPhoto } from '../controllers/users.controller';

// import roleProtect from '../middleware/role-protect';
// import validateJWT from '../middleware/validateJwt';

const userRoutes = Router();

userRoutes.get(ROUTES.user, getAllUsers);
userRoutes.patch(`${ROUTES.user}/:id`, updateUserById);
userRoutes.post(`${ROUTES.user}/:id/upload`, uploadPhoto);

// eslint-disable-next-line import/prefer-default-export
export const users = userRoutes;
