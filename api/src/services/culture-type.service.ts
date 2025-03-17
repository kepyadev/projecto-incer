import {
  createCulturaType,
  createManyCulturaType,
  deleteCulturaType,
  getAllCulturaType,
  getCulturaTypeById,
  updateCulturaType,
} from '../repositories/NoSql/cultura-type.repository';
import { CulturaTypeDTO } from '../types/cultura-type';

// eslint-disable-next-line import/prefer-default-export
export const getAllCultureTypeService = () => getAllCulturaType();

export const getCulturaTypeByIdService = (id: string) => getCulturaTypeById(id);

export const createCulturaTypeService = (cultura: CulturaTypeDTO) => createCulturaType(cultura);

export const createManyCulturaTypeService = (data: CulturaTypeDTO[]) => createManyCulturaType(data);

export const deleteCulturaTypeService = (id: string) => deleteCulturaType(id);

export const updateCulturaTypeService = (id: string, data: CulturaTypeDTO) =>
  updateCulturaType(id, data);
