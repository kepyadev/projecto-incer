import { FilterQuery, Types } from 'mongoose';

import { IsDeleted } from '../../constants';
import { EquipamentoType } from '../../constants/equipamento-type';
import equipamentoTypeModel from '../../entities/equipamento-type.model';
import { EquipamentoTypeDTO, IEquipamentoType } from '../../types/equipamento-type';
import { createMany, deleteEntity, getAllItens, updateGeneric } from './repository-helper';

// eslint-disable-next-line import/prefer-default-export
export const getAllEquipamentoType = () => getAllItens(equipamentoTypeModel);

export const getEquipamentoTypeById = (id: string) =>
  equipamentoTypeModel
    .findOne(
      {
        [IsDeleted]: { $ne: true },
        [EquipamentoType.Id]: Types.ObjectId(id),
      } as FilterQuery<IEquipamentoType>,
      { [IsDeleted]: false }
    )
    .exec();

export const createEquipamentoType = (data: EquipamentoTypeDTO) =>
  equipamentoTypeModel.create(data);

export const createManyEquipamentoType = (data: EquipamentoTypeDTO[]) =>
  createMany(equipamentoTypeModel, data);

export const deleteEquipamentoType = (id: string) =>
  deleteEntity<IEquipamentoType>(equipamentoTypeModel, {
    [EquipamentoType.Id]: id,
  } as FilterQuery<IEquipamentoType>);

export const updateEquipamentoType = (id: string, data: EquipamentoTypeDTO) =>
  updateGeneric(equipamentoTypeModel, id, data);
