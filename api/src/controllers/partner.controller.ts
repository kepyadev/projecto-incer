import { Request, Response } from 'express';
import { env } from 'process';

import { HTTP, owner, User, UserRole } from '../constants';
import {
  createPartnerMongoRepository,
  getAlPartnerMongoRepository,
  getPartnerMongoRepository,
} from '../repositories/NoSql/partner.repository';
import {
  createUser,
  findUserByEmail,
  findUserByPhone,
} from '../repositories/NoSql/user.repository';
import {
  createPartnerService,
  getAllPartnerService,
  getPartnerByIdService,
} from '../services/partner.service';
import { PartnerFields, PartnerRequiredFields } from '../types/partner';
import { IUser } from '../types/user';
import { validateInputAcceptableData, validateInputRequeridData } from './auth-helper';
import { errorResponse, makeResponse } from './utils';

export const getAllPartner = async (_req: Request, res: Response) => {
  try {
    const producers = await getAllPartnerService(getAlPartnerMongoRepository);

    return makeResponse(res, producers);
  } catch (error: any) {
    if (error.message === 'index_not_found_exception')
      return makeResponse(res, { data: null, count: 0 });
    return errorResponse(res, error.message);
  }
};

export const getPartnerById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const producers = await getPartnerByIdService(id, getPartnerMongoRepository);

    return makeResponse(res, producers);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const createPartner = async (req: Request, res: Response) => {
  const data = req.body;

  // eslint-disable-next-line prefer-destructuring
  const user = req.user! as IUser;

  const partner = {
    ...data,
    [owner]: user[User.id],
    user: {
      role: UserRole.GeneralAnalitic,
      ...data.user,
      [User.password]: env.DEFAULT_USER_PASSWORD,
    },
  };

  try {
    validateInputRequeridData(partner, PartnerRequiredFields);
    validateInputAcceptableData(partner, PartnerFields);

    const userByPhone = await findUserByPhone(partner.user[User.phoneNumber]);
    if (userByPhone) {
      return errorResponse(res, 'Este número de telefone já está cadastrado!');
    }
    const userByEmail = await findUserByEmail(partner.user[User.email]!);
    if (userByEmail) {
      return errorResponse(res, 'O email já está cadastrado!');
    }
    const dataCreated = await createPartnerService(
      partner,
      createPartnerMongoRepository,
      createUser
    );

    return makeResponse(res, dataCreated);
  } catch (error: any) {
    if (error.code === 11000) {
      return errorResponse(res, 'Número de telefone já está em uso.');
    }
    return errorResponse(res, error.message, undefined, HTTP.INTERNAL_SERVER_ERROR);
  }
};
