import { FilterQuery } from 'mongoose';

import { NationalProductionType } from '../../constants';
import nationalProductionModel from '../../entities/national-production.model';
import {
  INationalProduction,
  INationalProductionData,
  NationalProductionDTO,
} from '../../types/national-production';
import { createMany, deleteEntity, getAllItens, updateGeneric } from './repository-helper';

// eslint-disable-next-line import/prefer-default-export
// 导出一个函数，用于获取所有国家生产数据
export const getAllNationalProduction = () => getAllItens(nationalProductionModel);

export const getNationalProductionById = (id: string) =>
  nationalProductionModel
    .findOne({
      [NationalProductionType.Id]: id,
    } as FilterQuery<INationalProduction>)
    .exec();

export const CreateNationalProduction = (infrastruture: NationalProductionDTO) =>
  nationalProductionModel.create(infrastruture);

export const createManyInfrastructureType = (data: NationalProductionDTO[]) =>
  createMany(nationalProductionModel, data);

export const DeleteNationalProduction = (id: string) =>
  deleteEntity<INationalProductionData>(nationalProductionModel, {
    [NationalProductionType.Id]: id,
  } as FilterQuery<INationalProductionData>);

export const UpdateNationalProduction = (id: string, data: NationalProductionDTO) =>
  updateGeneric(nationalProductionModel, id, data);
