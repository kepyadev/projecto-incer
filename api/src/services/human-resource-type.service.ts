import {
  createHumanResourceType,
  createManyHumanResourceType,
  deleteHumanResourceType,
  getAllHumanResourceType,
  getHumanResourceTypeById,
  updateHumanResourceType,
} from '../repositories/NoSql/human-resource-type';
import { HumanResourceDTO } from '../types/human-resource';
import { HumanResourceTypeDTO } from '../types/human-resource-type';

// eslint-disable-next-line import/prefer-default-export
export const getAllHumanResourceTypeService = () => getAllHumanResourceType();

export const getHumanResourceTypeByIdService = (id: string) => getHumanResourceTypeById(id);

export const createHumanResourceTypeService = (data: HumanResourceTypeDTO) =>
  createHumanResourceType(data);

export const createManyHumanResourceTypeService = (data: HumanResourceTypeDTO[]) =>
  createManyHumanResourceType(data);

export const deleteHumanResourceTypeService = (id: string) => deleteHumanResourceType(id);

export const updateHumanResourceTypeService = (id: string, data: HumanResourceDTO) =>
  updateHumanResourceType(id, data);
