import {
  createInfrastrutureType,
  createManyInfrastructureType,
  deleteInfrastructType,
  getAllInfrastructureType,
  getInfrastrutureTypeById,
  updateInfrastructureType,
} from '../repositories/NoSql/infrastruture-type.repository';
import { InfrastructureTypeDTO } from '../types/infrastructure-type';

export const getAllInfrastructureTypeService = () => getAllInfrastructureType();

export const getInfrastructureTypeByIdService = (id: string) => getInfrastrutureTypeById(id);

export const createInfrastrutureTypeService = (data: InfrastructureTypeDTO) =>
  createInfrastrutureType(data);

export const createManyInfrastructureTypeService = (data: InfrastructureTypeDTO[]) =>
  createManyInfrastructureType(data);

export const deleteInfrastructTypeService = (id: string) => deleteInfrastructType(id);

export const updateInfrastructTypeService = (id: string, data: InfrastructureTypeDTO) =>
  updateInfrastructureType(id, data);
