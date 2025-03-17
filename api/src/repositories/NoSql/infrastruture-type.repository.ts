import { FilterQuery } from 'mongoose';

import { IsDeleted } from '../../constants';
import { InfrastructureType } from '../../constants/infrastructure-type';
import { NationalProductionType } from '../../constants/national-production';
import infrastructTypeModel from '../../entities/infrastruct-type.model';
import { IInfrastructureType, InfrastructureTypeDTO } from '../../types/infrastructure-type';
import { createMany, deleteEntity, getAllItens, updateGeneric } from './repository-helper';

// eslint-disable-next-line import/prefer-default-export
export const getAllInfrastructureType = () => getAllItens(infrastructTypeModel);

export const getInfrastrutureTypeById = (id: string) =>
  infrastructTypeModel
    .findOne(
      {
        [IsDeleted]: { $ne: true },
        [NationalProductionType.Id]: id,
      } as FilterQuery<IInfrastructureType>,
      {
        [IsDeleted]: false,
      }
    )
    .exec();

export const createInfrastrutureType = (infrastruture: InfrastructureTypeDTO) =>
  infrastructTypeModel.create(infrastruture);

export const createManyInfrastructureType = (data: InfrastructureTypeDTO[]) =>
  createMany(infrastructTypeModel, data);

export const deleteInfrastructType = (id: string) =>
  deleteEntity<IInfrastructureType>(infrastructTypeModel, {
    [InfrastructureType.Id]: id,
  } as FilterQuery<IInfrastructureType>);

export const updateInfrastructureType = (id: string, data: InfrastructureTypeDTO) =>
  updateGeneric(infrastructTypeModel, id, data);
