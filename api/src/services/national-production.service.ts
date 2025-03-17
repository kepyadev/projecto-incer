import { createManyInfrastructureType } from '../repositories/NoSql/infrastruture-type.repository';
import {
  CreateNationalProduction,
  DeleteNationalProduction,
  getAllNationalProduction,
  getNationalProductionById,
  UpdateNationalProduction,
} from '../repositories/NoSql/national-production.repository';
import { InfrastructureTypeDTO } from '../types/infrastructure-type';
import { NationalProductionDTO } from '../types/national-production';

export const getAllNationalProductionService = () => getAllNationalProduction();

export const getNationalProductionServiceById = (id: string) => getNationalProductionById(id);

export const CreateNationalProductionService = (data: NationalProductionDTO) =>
  CreateNationalProduction(data);

export const createManyInfrastructureTypeService = (data: InfrastructureTypeDTO[]) =>
  createManyInfrastructureType(data);

export const DeleteNationalProductionService = (id: string) => DeleteNationalProduction(id);

export const UpdateNationalProductionService = (id: string, data: NationalProductionDTO) =>
  UpdateNationalProduction(id, data);
