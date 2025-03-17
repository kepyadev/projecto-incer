/* eslint-disable @typescript-eslint/no-unused-vars-experimental */
import { Request, Response } from 'express';

import {
  Cooperative,
  County,
  Entities,
  HTTP,
  Producer,
  province,
  User,
  UserRole,
} from '../constants';
import { getAllAnimal, getAllAnimalByProducer } from '../repositories/NoSql/animal.repository';
import { addUnlinkedProduceer } from '../repositories/NoSql/cooperative.repository';
import { getAllCulture, getAllCultureByProducer } from '../repositories/NoSql/cultura.repository';
import { getAllMachines, getAllMachinesByProducer } from '../repositories/NoSql/machine.repository';
import { findFinProducerByNif, findProducerById } from '../repositories/NoSql/producer.repository';
import { getAllAnimalByProducerService } from '../services/animal.service';
import {
  getCooperativeByIdService,
  getCooperativeByUserService,
} from '../services/cooperative.service';
import { getCountyByIdService } from '../services/county.service';
import { getAllCultureByProducerService } from '../services/cultura.service';
import { getAllFazendaByProducerService } from '../services/fazenda.service';
import {
  getAllProducersByCooperativeService,
  getAllProducerService,
  getAllProducersWithCooperativeService,
  getMyCooperativeService,
  getProducerByIdService,
  getProducerByUserIdService,
  getProducerByUserShortCodeService,
  getProducerNifByUser,
  linkWithCooperativeService,
  serviceCreateProducer,
  unlinkCooperativeService,
} from '../services/producer.service';
import { ICooperative } from '../types/cooperative';
import { IFazenda } from '../types/fazenda';
import { ProducerAcceptableFields, ProducerRequiredFields } from '../types/producer';
import { IUser } from '../types/user';
import { formatFetchParams } from '../utils';
import { isValidBiNumber } from '../utils/regex';
import {
  isAllGivenFieldAcceptedForEntity,
  isPresentAllRequiredFieldOnBody,
  validateInputAcceptableData,
  validateInputRequeridData,
} from './auth-helper';
import {
  errorResponse,
  extractPaginationParams,
  makeResponse,
  removePaginationParams,
} from './utils';

export const createProducer = async (req: Request, res: Response) => {
  const data = req.body;

  // eslint-disable-next-line prefer-destructuring
  const user = req.user! as IUser;

  const producer = { onwer: user[User.id], ...data };

  const existProducer = await getProducerNifByUser(data[Producer.nif]);

  if (existProducer) {
    return errorResponse(res, 'Este número NIF já está cadastrado!');
  }
  validateInputRequeridData(data, ProducerRequiredFields);
  validateInputAcceptableData(data, ProducerAcceptableFields);

  if (!isValidBiNumber(data[Producer.bi]))
    return errorResponse(
      res,
      `O número do bilhete de identidade que informou é inválido`,
      'e-100',
      HTTP.BAD_REQUEST
    );

  try {
    const cooperative = (await getCooperativeByIdService(
      data[Producer.cooperativeId]
    )) as ICooperative;
    const producerResponse = await serviceCreateProducer(producer);

    const county = await getCountyByIdService(data[Producer.county]);

    return makeResponse(res, producerResponse, 'Produtor cadastrado', HTTP.CREATED);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getAllProducer = async (req: Request, res: Response) => {
  try {
    const producers = await getAllProducerService();

    return makeResponse(res, producers);
  } catch (error: any) {
    if (error.message === 'index_not_found_exception')
      return makeResponse(res, { data: null, count: 0 });
    return errorResponse(res, error.message);
  }
};
export const getAllProducerWithCooperative = async (req: Request, res: Response) => {
  const { page, limit } = extractPaginationParams(req.query);

  const filter = removePaginationParams(req.query);

  try {
    const producers = await getAllProducersWithCooperativeService();

    return makeResponse(res, producers);
  } catch (error: any) {
    if (error.message === 'index_not_found_exception')
      return makeResponse(res, { data: null, count: 0 });
    return errorResponse(res, error.message);
  }
};

export const getProducerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const producer = await getProducerByIdService(id);
    return makeResponse(res, producer);
  } catch (error: any) {
    return errorResponse(res, error.message || error.msg);
  }
};

export const updateProducer = (req: Request, res: Response) => {};
export const removeProducer = (req: Request, res: Response) => {};

export const getAllProducersByCooperative = async (req: Request, res: Response) => {
  const { id } = req.query;
  const { page, limit } = extractPaginationParams(req.query);
  const filter = removePaginationParams(req.query);

  const finalFilter = Object.keys(filter).map(key => {
    if (key === 'cooperative') return { match: { cooperative_id: filter[key] } };
    if (key === 'producer') return { match: { producer: filter[key] } };

    return null;
  });

  if (!id)
    return errorResponse(
      res,
      'Por favor, informe o identificar da cooperativa',
      undefined,
      HTTP.BAD_REQUEST
    );
  try {
    const producers = await getAllProducersByCooperativeService(id as string);

    return makeResponse(res, producers);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getMyCooperative = async (req: Request, res: Response) => {
  const user = req.user! as IUser;
  const id = user[User.id];
  if (!id)
    return errorResponse(
      res,
      'Por favor, informe o identificar da cooperativa',
      undefined,
      HTTP.BAD_REQUEST
    );
  try {
    const cooperative = await getMyCooperativeService(id);
    if (cooperative) return makeResponse(res, cooperative[0]);

    return makeResponse(res, cooperative);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const linkWithCooperative = async (req: Request, res: Response) => {
  const { _id, cooperative: cooperativeIdIn } = req.body;
  const shortCode = _id;
  const user = req.user! as IUser;

  if (!shortCode || shortCode === null)
    return errorResponse(
      res,
      'lamentamos, os dados que informou não são suficientes/válidos para processar o pedido!\npor favor informe a cooperativa e o productor'
    );

  try {
    // const cooperativeId = user[User.role] === UserRole.Technician ? cooperativeIdIn : user[User.id];

    const cooperative =
      user[User.role] === UserRole.Technician
        ? await getCooperativeByIdService(cooperativeIdIn)
        : await getCooperativeByUserService(user[User.id]);

    if (!cooperative) throw new Error('Lamentamos, não foi possível localizar a cooperativa');

    if (
      cooperative !== null &&
      !cooperative[Cooperative.userId].equals(user[User.id]) &&
      user[User.role] !== UserRole.Technician
    ) {
      return errorResponse(
        res,
        'Lamentamos, não tem permissão para efectuar esta operação pois, não é o proprietário da cooperativa'
      );
    }

    const producer = await getProducerByUserShortCodeService(shortCode);

    if (!producer) throw new Error('Lamentamos, não foi possível localizar o produtor');

    const producerUpdated = await linkWithCooperativeService(
      cooperative[Cooperative.id],
      shortCode
    );

    return makeResponse(res, producerUpdated);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const unlinkCooperative = async (req: Request, res: Response) => {
  const { producer: producerId } = req.body;

  if (!producerId || producerId === null)
    return errorResponse(
      res,
      'lamentamos, os dados que informou não são suficientes/inválidos para processar o pedido!\npor favor informe o productor'
    );

  try {
    const producer = await findProducerById(producerId);

    if (!producer) throw new Error('Produtor não encontrado!');

    const producerUpdated = await unlinkCooperativeService(
      producer[Producer.cooperativeId] ?? '',
      producer[Producer.id]
    );

    await addUnlinkedProduceer(producer[Producer.cooperativeId] ?? '', producer[Producer.id]);

    return makeResponse(res, producerUpdated);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const linkNewProducerWithCooperative = async () => {
  // create user with status false
  // create producer linked with cooperative
};

export const getAllFazendaProducer = async (req: Request, res: Response) => {
  const user = req.user as IUser;

  const producer = await getProducerByUserIdService(user[User.id]);
  if (!producer) throw new Error('Lamentamos, não foi possivel localizar o produtor');

  try {
    const result = await getAllFazendaByProducerService(producer[Producer.id], undefined);

    return makeResponse(res, result);
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('ERRR 1', error);

    return errorResponse(res, error.message);
  }
};

export const getAllFazendaByProducerId = async (req: Request, res: Response) => {
  const { page, limit } = extractPaginationParams(req.query);

  try {
    const producerResult = await getProducerByIdService(req.params.id);
    if (!producerResult) throw new Error('Lamentamos, não foi possivel localizar o produtor');

    const result = await getAllFazendaByProducerService(producerResult[Producer.id]);

    return makeResponse(res, result);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getProducerResume = async (req: Request, res: Response) => {
  const user = req.user! as any;

  try {
    const producer = await getProducerByUserIdService(user[User.id]);
    if (!producer) throw new Error('Lamentamos, o produtor não foi encontrado!');

    const cultures = (await getAllCultureByProducer(producer[Producer.id])).count;
    const animais = (await getAllAnimalByProducer(producer[Producer.id])).count;
    const fazendas = (await getAllFazendaByProducerService(producer[Producer.id], undefined)).count;
    const machines = (await getAllMachinesByProducer(producer[Producer.id])).length;

    return makeResponse(res, {
      cultures,
      machines,
      fazendas,
      animals: animais,
    });
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export const getMyCultures = async (req: Request, res: Response) => {
  const { page, limit } = extractPaginationParams(req.query);
  const user = req.user as IUser;

  try {
    const producer = await getProducerByUserIdService(user[User.id]);
    if (!producer) throw new Error('Lamentamos, o produtor não foi encontrado!');

    const cultures = await getAllCultureByProducerService(producer[Producer.id]);
    makeResponse(res, cultures);
  } catch (error: any) {
    errorResponse(res, error);
  }
};

export const getMyAnimals = async (req: Request, res: Response) => {
  const { page, limit } = extractPaginationParams(req.query);
  const user = req.user as IUser;

  try {
    const producer = await getProducerByUserIdService(user[User.id]);
    if (!producer) throw new Error('Lamentamos, o produtor não foi encontrado!');

    const animals = await getAllAnimalByProducerService(producer[Producer.id]);
    makeResponse(res, animals);
  } catch (error: any) {
    errorResponse(res, error);
  }
};
