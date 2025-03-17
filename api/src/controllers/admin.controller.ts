import { Request, Response } from 'express';
import { env } from 'process';

import { HTTP, User, UserRole } from '../constants';
import { findUserByEmail, findUserByPhone } from '../repositories/NoSql/user.repository';
import { CreateAdminService } from '../services/admin.service';
import { UserAcceptableFields, UserRequiredFields } from '../types/user';
import { validateInputAcceptableData, validateInputRequeridData } from './auth-helper';
import { errorResponse, makeResponse } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const createAdmin = async (req: Request, res: Response) => {
  const data = {
    ...req.body,
    [User.password]: env.DEFAULT_USER_PASSWORD,
    [User.role]: UserRole.Admin,
  };

  validateInputRequeridData(data, UserRequiredFields);
  validateInputAcceptableData(data, UserAcceptableFields);

  const userByPhone = await findUserByPhone(data[User.phoneNumber]);
  if (userByPhone) {
    return errorResponse(res, 'Este número de telefone já está cadastrado!');
  }

  const userByEmail = await findUserByEmail(data[User.email]!);
  if (userByEmail) {
    return errorResponse(res, 'O email já está cadastrado!');
  }

  try {
    const producerResponse = await CreateAdminService(data);

    return makeResponse(res, producerResponse, 'Produtor cadastrado', HTTP.CREATED);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};
