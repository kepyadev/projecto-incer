import {
  createMeioEstacionario,
  deleteMeioEstacionario,
  getAllMeioEstacionario,
  getMeioEstacionarioByFazenda,
  getMeioEstacionarioById,
} from '../repositories/NoSql/meio-estacionario.repository';
import { IFetchParams } from '../types';
import { MeioEstacionarioDTO } from '../types/meio-estacionario';

export const getAllMeioEstacionarioService = () => getAllMeioEstacionario();

export const getMeioEstacionarioByFazendaService = (fazendaId: string, fetchParams: IFetchParams) =>
  getMeioEstacionarioByFazenda(fazendaId, fetchParams);

export const getMeioEstacionarioByIdService = (id: string) => getMeioEstacionarioById(id);

export const createMeioEstacionarioService = (data: MeioEstacionarioDTO) =>
  createMeioEstacionario(data);

export const deleteMeioEstacionarioService = (id: string) => deleteMeioEstacionario(id);
