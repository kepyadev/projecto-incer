import { FilterQuery } from 'mongoose';

import { IsDeleted } from '../../constants';
import { HumanResourceType } from '../../constants/human-resource-type';
import humanResourceTypeModel from '../../entities/human-resource-type.model';
import { HumanResourceDTO } from '../../types/human-resource';
import { HumanResourceTypeDTO, IHumanResourceType } from '../../types/human-resource-type';
import { createMany, deleteEntity, getAllItens, updateGeneric } from './repository-helper';

export const getAllHumanResourceType = () => getAllItens(humanResourceTypeModel, undefined);

export const getHumanResourceTypeById = (id: string) =>
  humanResourceTypeModel
    .findOne(
      {
        [IsDeleted]: { $ne: true },
        [HumanResourceType.Id]: id,
      } as FilterQuery<IHumanResourceType>,
      { [IsDeleted]: false }
    )
    .exec();

export const createHumanResourceType = (data: HumanResourceTypeDTO) =>
  humanResourceTypeModel.create(data);

export const createManyHumanResourceType = (data: HumanResourceTypeDTO[]) =>
  createMany(humanResourceTypeModel, data);

export const deleteHumanResourceType = (id: string) =>
  deleteEntity<IHumanResourceType>(humanResourceTypeModel, {
    [HumanResourceType.Id]: id,
  } as FilterQuery<IHumanResourceType>);

export const updateHumanResourceType = (id: string, data: HumanResourceDTO) =>
  updateGeneric(humanResourceTypeModel, id, data);
