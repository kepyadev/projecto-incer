import {
  createEquipamentoType,
  createManyEquipamentoType,
  deleteEquipamentoType,
  getAllEquipamentoType,
  getEquipamentoTypeById,
  updateEquipamentoType,
} from '../repositories/NoSql/equipamento-type.repository';
import { EquipamentoTypeDTO } from '../types/equipamento-type';

// eslint-disable-next-line import/prefer-default-export
export const getAllEquipamentoTypeService = () => getAllEquipamentoType();

export const getEquipamentoTypeByIdService = (id: string) => getEquipamentoTypeById(id);

export const createEquipamentoTypeService = (data: EquipamentoTypeDTO) =>
  createEquipamentoType(data);

export const createManyEquipamentoTypeService = (data: EquipamentoTypeDTO[]) =>
  createManyEquipamentoType(data);

export const deleteEquipamentoTypeService = (id: string) => deleteEquipamentoType(id);

export const updateEquipamentoTypeService = (id: string, data: EquipamentoTypeDTO) =>
  updateEquipamentoType(id, data);
