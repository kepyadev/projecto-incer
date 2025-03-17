import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import { validateToken } from '../controllers/auth-helper';
import { errorResponse } from '../controllers/utils';

// eslint-disable-next-line consistent-return
const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  try {
    if (authHeader) {
      const tokenType = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (tokenType !== process.env.TOKEN_TYPE)
        return res.status(401).json({ msg: 'Não autorizado' });

      const isValidToken = validateToken(token, process.env.JWT_SECRET || 'error');
      if (isValidToken) {
        const decoded = isValidToken as JwtPayload;
        req.user = decoded.user;

        return next();
      }
    }
    return res.status(401).json({ msg: 'Não autorizado' });
  } catch (error: any) {
    return errorResponse(res, error);
  }
};

export default validateJWT;
