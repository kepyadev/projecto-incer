import { FilterQuery } from 'mongoose';

import { IsDeleted } from '../../constants';
import { MeioEstacionarioType } from '../../constants/meio-estacionario-type';
import meioEstacionarioTypeModel from '../../entities/meio-estacionario-type.model';
import { IMeioEstacionarioType, MeioEstacionarioTypeDTO } from '../../types/meio-estacionario-type';
import { createMany, deleteEntity, getAllItens, updateGeneric } from './repository-helper';

// eslint-disable-next-line import/prefer-default-export
export const getAllMeioEstacionarioType = () => getAllItens(meioEstacionarioTypeModel);

export const getMeioEstacionarioTypeById = (id: string) =>
  meioEstacionarioTypeModel
    .findById({ [IsDeleted]: { $ne: true }, [MeioEstacionarioType.Id]: id })
    .exec();

export const createMeioEstacionarioType = (data: MeioEstacionarioTypeDTO) =>
  meioEstacionarioTypeModel.create(data);

export const createManyMeioEstacionarioType = (data: MeioEstacionarioTypeDTO[]) =>
  createMany(meioEstacionarioTypeModel, data);

export const deleteMeioEstacionarioType = (id: string) =>
  deleteEntity<IMeioEstacionarioType>(meioEstacionarioTypeModel, {
    [MeioEstacionarioType.Id]: id,
  } as FilterQuery<IMeioEstacionarioType>);

export const updateMeioEstacionarioType = (id: string, data: MeioEstacionarioTypeDTO) =>
  updateGeneric(meioEstacionarioTypeModel, id, data);
