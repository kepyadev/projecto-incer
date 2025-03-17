import {
  createInfrastruture,
  getAllInfrastructure,
  getInfrastructureByFazenda,
  getInfrastrutureById,
} from '../repositories/NoSql/infrastructure.repository';
import { IFetchParams } from '../types';
import { InfrastructureDTO } from '../types/infrastructure';

export const getInfrastrutureByIdService = (id: string) => getInfrastrutureById(id);

export const getAllInfrastrutureService = () => getAllInfrastructure();

export const getInfrastrutureByFazendaService = (fazendaId: string, fetchParams: IFetchParams) =>
  getInfrastructureByFazenda(fazendaId, fetchParams);

export const createInfrastrutureService = (infrastruture: InfrastructureDTO) =>
  createInfrastruture(infrastruture);
