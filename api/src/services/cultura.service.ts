import {
  createCultura,
  getAllCulture,
  getAllCultureByProducer,
  getCultureByCooperative,
  getCultureByFazenda,
  getCultureById,
} from '../repositories/NoSql/cultura.repository';
import { IFetchParams } from '../types';
import { ICultura, ICulturaDTO } from '../types/cultura';

// eslint-disable-next-line import/prefer-default-export
export const createCulturaService = (cultura: ICulturaDTO) => createCultura(cultura);

export const getCulturasByCooperativeService = (cooperativeId: string) =>
  getCultureByCooperative(cooperativeId);

export const getAllCultureService = (fetchParams?: IFetchParams) => getAllCulture(fetchParams);

export const getCultureByIdService = (id: string) => getCultureById(id);

export const getCultureByFazendaService = (fazendaId: string, fetchParams: IFetchParams) =>
  getCultureByFazenda(fazendaId, fetchParams);

export const getAllCultureByProducerService = async (
  producerId: string
): Promise<{ count: number; data: ICultura[] }> => getAllCultureByProducer(producerId);
