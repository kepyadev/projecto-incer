import { NextFunction, Request, Response } from 'express';

import { HTTP } from '../constants';
import { IUser, UserRole } from '../types/user';

function roleProtect(roles: UserRole[]) {
  // eslint-disable-next-line func-names
  return function (req: Request, res: Response, next: NextFunction) {
    // eslint-disable-next-line prefer-destructuring
    const user: IUser = req.user as any;
    if (!user || !roles.includes(user.role)) {
      return res.status(HTTP.UNAUTHORIZED).send({ msg: 'Não tem permissão para este recurso' });
    }

    return next();
  };
}

export default roleProtect;
