import { getCooperativeOfProducerByUserId } from '../repositories/NoSql/cooperative.repository';
import {
  createProducer,
  findAllProducer,
  findAllProducersByCooperative,
  findAllProducersOfMyCooperative,
  findAllProducerWithCooperative,
  findFinProducerByNif,
  findOneProducerByCooperative,
  findProducerById,
  findProducerByIdOnly,
  findProducerByIdWithoutFazendas,
  findProducerByUser,
  findProducerByUserShortCode,
  linkWithCooperative,
  unlinkCooperative,
  updatePeroducerByid,
} from '../repositories/NoSql/producer.repository';
import { IFetchParams } from '../types';
import { IProducer, ProducerDTO } from '../types/producer';
// eslint-disable-next-line import/prefer-default-export
export const getAllProducerService = (fetchParams?: IFetchParams) => findAllProducer(fetchParams);

export const getProducerByIdService = (id: string): Promise<IProducer> => findProducerById(id);

export const getProducerByIdWithoutFazendasService = (id: string) =>
  findProducerByIdWithoutFazendas(id);

export const getProducerByIOnly = (id: string) => findProducerByIdOnly(id);
export const putPeroducerByid = (id: string, data: any) => updatePeroducerByid(id, data);

export const getProducerByUserIdService = (userId: string) => findProducerByUser(userId);

export const getProducerByUserShortCodeService = (shortCode: string) =>
  findProducerByUserShortCode(shortCode);

export const getProducerNifByUser = (nif: string) => findFinProducerByNif(nif);

export const serviceCreateProducer = (producer: ProducerDTO) => createProducer(producer);

export const getAllProducers = () => findAllProducer();
export const getAllProducersWithCooperativeService = () => findAllProducerWithCooperative();

export const getAllProducersByCooperativeService = (cooperativeId: string) =>
  findAllProducersByCooperative(cooperativeId);

export const getAllProducersOfMyCooperativeService = (userId: string) =>
  findAllProducersOfMyCooperative(userId);

export const getOneProducerByCooperativeService = (cooperativeId: string, producerId: string) =>
  findOneProducerByCooperative(cooperativeId, producerId);

export const linkWithCooperativeService = (cooperativeId: string, shortCode: string) =>
  linkWithCooperative(cooperativeId, shortCode);

export const unlinkCooperativeService = (cooperativeId: string, producerId: string) =>
  unlinkCooperative(cooperativeId, producerId);

export const getMyCooperativeService = (id: string) => getCooperativeOfProducerByUserId(id);
