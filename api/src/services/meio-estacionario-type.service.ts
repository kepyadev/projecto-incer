import {
  createManyMeioEstacionarioType,
  createMeioEstacionarioType,
  deleteMeioEstacionarioType,
  getAllMeioEstacionarioType,
  getMeioEstacionarioTypeById,
  updateMeioEstacionarioType,
} from '../repositories/NoSql/meio-estacionario-type.respository';
import { MeioEstacionarioTypeDTO } from '../types/meio-estacionario-type';

export const getAllMeioEstacionarioTypeService = () => getAllMeioEstacionarioType();

export const getMeioEstacionarioTypeByIdService = (id: string) => getMeioEstacionarioTypeById(id);

export const createMeioEstacionarioTypeService = (data: MeioEstacionarioTypeDTO) =>
  createMeioEstacionarioType(data);

export const createManyMeioEstacionarioTypeService = (data: MeioEstacionarioTypeDTO[]) =>
  createManyMeioEstacionarioType(data);

export const deleteMeioEstacionarioTypeService = (id: string) => deleteMeioEstacionarioType(id);

export const updateMeioEstacionarioTypeService = (id: string, data: MeioEstacionarioTypeDTO) =>
  updateMeioEstacionarioType(id, data);
