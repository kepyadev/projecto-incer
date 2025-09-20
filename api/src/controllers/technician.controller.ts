import { Request, Response } from 'express';
import { env } from 'process';

import { HTTP, owner, Producer, User } from '../constants';
import {
  createUser,
  findUserByEmail,
  findUserByPhone,
} from '../repositories/NoSql/user.repository';
import { getAllCooperativeService } from '../services/cooperative.service';
import { getCountyByIdService } from '../services/county.service';
import { getAllCultureService } from '../services/cultura.service';
import { getAllFazendaService } from '../services/fazenda.service';
import {
  getAllProducers,
  getProducerNifByUser,
  serviceCreateProducer,
} from '../services/producer.service';
import { CreateTechnicianService, getAllTechnicianService } from '../services/technician.service';
import { ProducerAcceptableFields, ProducerRequiredFields } from '../types/producer';
import { IUser, UserAcceptableFields, UserRequiredFields } from '../types/user';
import { validateInputAcceptableData, validateInputRequeridData } from './auth-helper';
import { errorResponse, makeResponse } from './utils';

export const getAllTechnician = async (_req: Request, res: Response) => {
  try {
    // const users = await getAllTechnicianService();

    const result = await getAllTechnicianService();

    return makeResponse(res, result);
  } catch (error: any) {
    if (error.message === 'index_not_found_exception')
      return makeResponse(res, { data: null, count: 0 });
    return errorResponse(res, error.message);
  }
};

export const getTechnicianResume = async (_req: Request, res: Response) => {
  try {
    const cultures = (await getAllCultureService(undefined)).count;
    const producers = (await getAllProducers()).count;
    const fazendas = (await getAllFazendaService(undefined)).count;
    const cooperatives = (await getAllCooperativeService(undefined)).count;

    return makeResponse(res, {
      cultures,
      cooperatives,
      fazendas,
      producers,
    });
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const createTechnician = async (req: Request, res: Response) => {
  const data = { ...req.body };

  try {
    UserRequiredFields.push(User.county);

    validateInputRequeridData(
      { ...data, [User.password]: env.DEFAULT_USER_PASSWORD },
      UserRequiredFields
    );
    UserAcceptableFields.push(User.county);
    validateInputAcceptableData(data, UserAcceptableFields);

    const countyResult = await getCountyByIdService(data[User.county]);
    if (!countyResult) throw new Error('O município que informou não é válido!');

    const userByPhone = await findUserByPhone(data[User.phoneNumber]);
    if (userByPhone) {
      return errorResponse(res, 'Este número de telefone já está cadastrado!');
    }

    const userByEmail = await findUserByEmail(data[User.email]!);
    if (userByEmail) {
      return errorResponse(res, 'O email já está cadastrado!');
    }

    const producerResponse = await CreateTechnicianService({
      ...data,
      [User.password]: env.DEFAULT_USER_PASSWORD,
    });

    return makeResponse(res, producerResponse, 'Técnico cadastrado', HTTP.CREATED);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const createProducerWithCooperative = async (req: Request, res: Response) => {
  const producer = req.body;
  const userLogged = req.user! as IUser;
  const newUser = producer[Producer.userId];

  try {
    // Cria uma cópia local dos campos obrigatórios e adiciona cooperativeId apenas aqui
    const requiredFields = [...ProducerRequiredFields, Producer.cooperativeId];
    validateInputRequeridData(producer, requiredFields);
    validateInputAcceptableData(producer, ProducerAcceptableFields);

    const county = await getCountyByIdService(producer[Producer.county]);

    if (!county) throw new Error('Provincia/Municipio inválido!');

    const userByPhone = await findUserByPhone(newUser[User.phoneNumber]);
    if (userByPhone) {
      return errorResponse(res, 'Este número de telefone já está cadastrado!');
    }

    const userByEmail = await findUserByEmail(newUser[User.email]!);
    if (userByEmail) {
      return errorResponse(res, 'O email já está cadastrado!');
    }

    const userCreated = await createUser({
      ...newUser,
      [User.password]: env.DEFAULT_USER_PASSWORD,
    });
    const producerWithUseId = { ...producer, [Producer.userId]: userCreated[User.id] };

    const nProducer = await serviceCreateProducer({
      ...producerWithUseId,
      [owner]: userLogged[User.id],
    });

    return makeResponse(res, nProducer);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const createProducerWithoutCooperative = async (req: Request, res: Response) => {
  const producer = req.body;
  const userLogged = req.user! as IUser;
  const newUser = producer[Producer.userId];
  delete producer.cooperative;

  try {
    validateInputRequeridData(producer, ProducerRequiredFields);
    validateInputAcceptableData(producer, ProducerAcceptableFields);

    const county = await getCountyByIdService(producer[Producer.county]);

    if (!county) throw new Error('Provincia/Municipio inválido!');

    const existProducer = await getProducerNifByUser(producer[Producer.nif]);

    if (existProducer) {
      return errorResponse(res, 'Este número NIF já está cadastrado!');
    }

    const userByPhone = await findUserByPhone(newUser[User.phoneNumber]);
    if (userByPhone) {
      return errorResponse(res, 'Este número de telefone já está cadastrado!');
    }

    const userByEmail = await findUserByEmail(newUser[User.email]!);
    if (userByEmail) {
      return errorResponse(res, 'O email já está cadastrado!');
    }

    const userCreated = await createUser({
      ...newUser,
      [User.password]: env.DEFAULT_USER_PASSWORD,
    });
    const producerWithUseId = { ...producer, [Producer.userId]: userCreated[User.id] };

    const nProducer = await serviceCreateProducer({
      ...producerWithUseId,
      [owner]: userLogged[User.id],
    });

    return makeResponse(res, nProducer);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};
