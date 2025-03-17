import {
  createMachineType,
  createManyMachineType,
  deleteMachineType,
  getAllMachineTypes,
  getMachineTypeById,
  updateMachineType,
} from '../repositories/NoSql/machine-type.repository';
import { MachineTypeDTO } from '../types/machine-type.type';

export const getAllMachineTypeService = () => getAllMachineTypes();

export const getMachineTypeByIdService = (id: string) => getMachineTypeById(id);

export const createMachineTypeService = (data: MachineTypeDTO) => createMachineType(data);

export const createManyMachineTypeService = (data: MachineTypeDTO[]) => createManyMachineType(data);

export const deleteMachineTypeService = (id: string) => deleteMachineType(id);

export const updateMachineTypeService = (id: string, data: MachineTypeDTO) =>
  updateMachineType(id, data);
