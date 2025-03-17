import { FilterQuery } from 'mongoose';

import { CulturaType, IsDeleted } from '../../constants';
import cultureTypesModel from '../../entities/culture-types.model';
import { CulturaTypeDTO, ICulturaType } from '../../types/cultura-type';
import { createMany, deleteEntity, getAllItens, updateGeneric } from './repository-helper';

// eslint-disable-next-line import/prefer-default-export
export const getAllCulturaType = () =>
  getAllItens<ICulturaType>(cultureTypesModel, undefined, {}, { is_deleted: false });
// cultureTypesModel.find({ [IsDeleted]: { $ne: true } }).exec();

export const getCulturaTypeById = (id: string) =>
  cultureTypesModel.findById(
    { [IsDeleted]: { $ne: true }, [CulturaType.id]: id },
    { [IsDeleted]: false }
  );

export const createCulturaType = (cultura: CulturaTypeDTO) => cultureTypesModel.create(cultura);

export const createManyCulturaType = (data: CulturaTypeDTO[]) =>
  createMany(cultureTypesModel, data);

export const deleteCulturaType = (id: string) =>
  deleteEntity<ICulturaType>(cultureTypesModel, {
    [CulturaType.id]: id,
  } as FilterQuery<ICulturaType>);

export const updateCulturaType = (id: string, data: CulturaTypeDTO) =>
  updateGeneric(cultureTypesModel, id, data);
