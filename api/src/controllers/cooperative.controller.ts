import { Request, Response } from 'express';
import { env } from 'process';

import { ContactInformation, Cooperative, HTTP, owner, Producer, User } from '../constants';
import { getAllCultureByCooperative } from '../repositories/NoSql/cultura.repository';
import { findAllProducersByCooperative } from '../repositories/NoSql/producer.repository';
import {
  createUser,
  findUserByEmail,
  findUserByPhone,
} from '../repositories/NoSql/user.repository';
import { getAllAnimalByCooperativeService } from '../services/animal.service';
import {
  createCooperativeService,
  getAllCooperativeService,
  getCooperativeByIdService,
  getCooperativeByUserService,
} from '../services/cooperative.service';
import { getCountyByIdService } from '../services/county.service';
import { getCulturasByCooperativeService } from '../services/cultura.service';
import { getAllFazendaByCooperativeByUserIdService } from '../services/fazenda.service';
import {
  getAllProducersByCooperativeService,
  getOneProducerByCooperativeService,
  getProducerNifByUser,
  serviceCreateProducer,
} from '../services/producer.service';
import {
  CooperativeAcceptableFields,
  CooperativerRequiredFields,
  ICooperative,
} from '../types/cooperative';
import { ProducerAcceptableFields, ProducerRequiredFields } from '../types/producer';
import { IUser } from '../types/user';
import { validateInputAcceptableData, validateInputRequeridData } from './auth-helper';
import { errorResponse, makeResponse } from './utils';

export const getAllCooperative = async (_req: Request, res: Response) => {
  try {
    const params = _req.query;
    // Passa os parâmetros para o serviço
    const cooperatives = await getAllCooperativeService(params as any);

    return makeResponse(res, cooperatives);
  } catch (error: any) {
    if (error.message === 'index_not_found_exception')
      return makeResponse(res, { data: null, count: 0 });
    return errorResponse(res, error.message);
  }
};

export const getCooperativeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cooperative = await getCooperativeByIdService(id);

    return makeResponse(res, cooperative);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getAllCultures = async (req: Request, res: Response) => {
  const id = req.params.cooperative as string;
  try {
    const cultures = await getCulturasByCooperativeService(id);
    return makeResponse(res, cultures);
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('ER COO CULTURE', error.message);
    return errorResponse(res, error);
  }
};

export const getOneProducerByCooperative = async (req: Request, res: Response) => {
  const { cooperative, producer } = req.params;
  try {
    const producerResponse = await getOneProducerByCooperativeService(cooperative, producer);
    if (producerResponse[0]) return makeResponse(res, producerResponse[0]);

    return errorResponse(res, 'Produtor não encontrado!', '', HTTP.NOT_FOUND);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getAllProducersByCooperative = async (req: Request, res: Response) => {
  const { cooperative } = req.params;
  try {
    const producers = await getAllProducersByCooperativeService(cooperative);

    return makeResponse(res, producers);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getAllProducersOfMyCooperative = async (req: Request, res: Response) => {
  const user = req.user as IUser;

  const coop = (await getCooperativeByUserService(user[User.id])) as ICooperative;

  try {
    const producers = await findAllProducersByCooperative(coop[Cooperative.id], {});

    return makeResponse(res, producers);

    // return makeResponse(res, producers);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getAllFazendasOfMyCooperative = async (req: Request, res: Response) => {
  // eslint-disable-next-line prefer-destructuring
  const user = req.user! as any;

  try {
    const result = await getAllFazendaByCooperativeByUserIdService(user[User.id]);

    return makeResponse(res, result);
  } catch (error: any) {
    if (error.message === 'index_not_found_exception')
      return makeResponse(res, { data: null, count: 0 });

    return errorResponse(res, error.message);
  }
};

export const createCooperative = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const contact = {
      [ContactInformation.Phone]: data[Cooperative.contact][ContactInformation.Phone],
      [ContactInformation.Email]: data[Cooperative.contact][ContactInformation.Email] ?? '',
    };

    const cooperativeData = { ...data, [Cooperative.contact]: contact };

    validateInputRequeridData(cooperativeData, CooperativerRequiredFields);
    validateInputAcceptableData(cooperativeData, CooperativeAcceptableFields);

    const county = await getCountyByIdService(data[Cooperative.county]);

    if (!county) throw new Error('Provincia/Municipio inválido!');

    const existProducer = await getProducerNifByUser(data[Cooperative.nif]);

    if (existProducer) {
      return errorResponse(res, 'Este número NIF já está cadastrado!');
    }

    const userByPhone = await findUserByPhone(data[Cooperative.contact][ContactInformation.Phone]);
    if (userByPhone) {
      return errorResponse(res, 'Este número de telefone já está cadastrado!');
    }
    const userByEmail = await findUserByEmail(data[Cooperative.contact][ContactInformation.Email]);
    if (userByEmail) {
      return errorResponse(res, 'O email já está cadastrado!');
    }
    const cooperative = await createCooperativeService(cooperativeData);

    return makeResponse(res, cooperative);
  } catch (error: any) {
    return errorResponse(res, error.message || 'Lamentamos, ocorreu um erro');
  }
};

export const createProducerCooperative = async (req: Request, res: Response) => {
  const producer = req.body;
  const userLogged = req.user! as IUser;
  const newUser = producer[Producer.userId];

  try {
    ProducerRequiredFields.push(Producer.cooperativeId);
    validateInputRequeridData(producer, ProducerRequiredFields);
    validateInputAcceptableData(producer, ProducerAcceptableFields);

    const county = await getCountyByIdService(producer[Producer.county]);

    if (!county) throw new Error('Provincia/Municipio inválido!');

    const cooperative = await getCooperativeByIdService(producer[Producer.cooperativeId]);

    if (!cooperative) throw new Error('Cooperativa inválida!');

    const existProducer = await getProducerNifByUser(producer[Producer.nif]);

    if (existProducer) {
      return errorResponse(res, 'Este número NIF já está cadastrado!');
    }

    const userByPhone = await findUserByPhone(newUser[User.phoneNumber]);
    if (userByPhone) {
      return errorResponse(res, 'Este número de telefone já está cadastrado!');
    }

    const userByEmail = await findUserByEmail(newUser[User.email]);
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

export const getCooperativeResume = async (req: Request, res: Response) => {
  const user = req.user! as any;
  try {
    const cultures = (await getAllCultureByCooperative(user[User.cooperative][Cooperative.id]))
      .count;
    const animals = (await getAllAnimalByCooperativeService(user[User.cooperative][Cooperative.id]))
      .length;
    const producers = (
      await getAllProducersByCooperativeService(user[User.cooperative][Cooperative.id])
    ).count;
    const fazendas = (await getAllFazendaByCooperativeByUserIdService(user[User.id])).count;
    return makeResponse(res, {
      cultures,
      producers,
      fazendas,
      animals,
    });
  } catch (error: any) {
    return errorResponse(res, error.message || 'Error');
    // return errorResponse(res, error.message);
  }
};
