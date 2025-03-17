import { FilterQuery, Model } from 'mongoose';

import { IsDeleted } from '../../constants';
import { IFetchParams } from '../../types';

interface populateType {
  path: any;
  select?: any;
  model?: string;
  populate?: populateType;
}

export interface ListResponse<T> {
  data: T[];
  count: number;
}

// eslint-disable-next-line import/prefer-default-export
export const getAllItens = async <D>(
  model: Model<D>,
  fetchParams?: IFetchParams,
  filter: any = {},
  projection?: Record<string, boolean>,
  includeDeleted: boolean = false,
  populate?: string | populateType | populateType[]
) => {
  const finalFilter = includeDeleted
    ? {
        ...filter,
        [IsDeleted]: { $or: [true, false] },
      }
    : { ...filter, [IsDeleted]: { $ne: true } };
  const finalProjection = includeDeleted ? projection : { ...projection, [IsDeleted]: false };

  const { page, limit } = fetchParams || { page: 1, limit: 99999 };
  const count = await model.countDocuments(finalFilter);
  const data = await model
    .find(finalFilter, finalProjection)
    .populate(populate)
    .skip(limit * (page - 1))
    .limit(limit)
    .sort({ createdAt: -1 })
    .exec();

  return { data, count };
};

export const getById = async <D>(
  model: Model<D>,
  id: string,
  projection?: Record<string, boolean>,
  includeDeleted: boolean = false,
  populate?: string | populateType | populateType[]
): Promise<D | null> => {
  const filter = { _id: id } as unknown as FilterQuery<D>;
  const finalFilter = includeDeleted
    ? { ...filter, [IsDeleted]: { $or: [true, false] } }
    : { ...filter, [IsDeleted]: { $ne: true } };
  const finalProjection = includeDeleted ? projection : { ...projection, [IsDeleted]: false };

  const { page, limit } = { page: 1, limit: 1 };
  const count = await model.countDocuments(finalFilter);
  if (count > 0)
    return (
      await model
        .find(finalFilter, finalProjection)
        .populate(populate)
        .skip(limit * (page - 1))
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec()
    )[0];

  return null;
};

export const calcularSkip = (fetchParams: IFetchParams) =>
  fetchParams.limit * (fetchParams.page - 1);

export const getTotal = <D>(model: Model<D>, filter: FilterQuery<D> = {}) =>
  model.countDocuments(filter);

export const create = <D>(model: Model<D>, data: Record<string, unknown>) => model.create(data);

export const deleteEntity = async <D>(model: Model<D>, filter: FilterQuery<D>) => {
  const updateVal = { $set: { is_deleted: true } } as any;

  // const item = model.findById(filter);
  return model.findOneAndUpdate(filter, updateVal, { returnDocument: 'after' });
};

export const updateGeneric = <D>(model: Model<D>, id: string, data: unknown) => {
  const filter: FilterQuery<D> = { _id: id } as any;
  const updateVal = { $set: data } as any;
  return model.findOneAndUpdate(filter, updateVal, { returnDocument: 'after' }).exec();
};

export const createMany = <D>(model: Model<D>, data: Record<string, any>[]) =>
  model.insertMany(data);
