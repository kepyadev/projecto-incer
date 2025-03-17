import { FilterQuery, Types } from 'mongoose';

import { Cooperative, County, Producer } from '../../constants';
import cooperativeModel from '../../entities/cooperative.model';
import { IFetchParams } from '../../types';
import { CooperativeDTO, ICooperative } from '../../types/cooperative';
import { getAllItens } from './repository-helper';

export const getAllCooperative = (fetchParams: IFetchParams & Record<string, any>) =>
  getAllItens(
    cooperativeModel,
    fetchParams,
    {
      [Cooperative.isCooperative]: true,
    },
    { [Cooperative.userId]: false },
    false,
    [
      { path: Cooperative.userId },
      {
        path: Cooperative.county,
        select: '-createdAt -updatedAt -__v',
        populate: { path: County.ProvinceId, select: '-createdAt -updatedAt -__v' },
      },
    ]
  );
export const createCooperative = (cooperative: CooperativeDTO) =>
  cooperativeModel.create(cooperative);

export const getCooperativeById = (id: string) =>
  cooperativeModel
    .findById(id)
    .populate({ path: Cooperative.county, populate: { path: County.ProvinceId } })
    .populate({ path: Cooperative.desvinculados, populate: { path: Producer.userId } })
    .exec();

export const findCooperativeByUser = (userId: string) =>
  cooperativeModel.findOne(
    { [Cooperative.userId]: new Types.ObjectId(userId) } as FilterQuery<ICooperative>,
    { [Cooperative.desvinculados]: 0, [Cooperative.owner]: 0 }
  );

export const addUnlinkedProduceer = async (cooperativeId: string, producerId: string) => {
  const cooperative = await getCooperativeById(cooperativeId);

  if (!cooperative) throw new Error('Lamentamos, a cooperativa não foi encontrada!');

  cooperative[Cooperative.desvinculados].push(producerId);
  const updateValue = {
    $set: { [Cooperative.desvinculados]: cooperative[Cooperative.desvinculados] },
  } as any;

  return cooperative?.updateOne(updateValue);
};

export const updateCooperative = async (userId: string, cooperative: Partial<CooperativeDTO>) => {
  const cooperativa2 = cooperativeModel.findOne(
    { [Cooperative.userId]: new Types.ObjectId(userId) } as FilterQuery<ICooperative>,
    { [Cooperative.desvinculados]: 0, [Cooperative.owner]: 0 }
  );

  return cooperativa2.updateOne({
    president: cooperative?.[Cooperative.president],
    nif: cooperative?.[Cooperative.nif],
  });
};
export const getCooperativeOfProducerByUserId = (userId: string) =>
  cooperativeModel
    .aggregate([
      {
        $lookup: {
          from: 'producers',
          localField: '_id',
          foreignField: 'cooperative',
          as: 'producers',
        },
      },
      {
        $unwind: {
          path: '$producers',
        },
      },
      {
        $match: {
          'producers.user': new Types.ObjectId(userId),
        },
      },
      {
        $project: {
          producers: false,
          createdAt: false,
          updatedAt: false,
          __v: false,
        },
      },
      {
        $lookup: {
          from: 'counties',
          localField: 'county',
          foreignField: '_id',
          as: 'county',
        },
      },
      {
        $unwind: {
          path: '$county',
        },
      },
      {
        $lookup: {
          from: 'provinces',
          localField: 'county.province',
          foreignField: '_id',
          as: 'county.province',
        },
      },
      {
        $unwind: {
          path: '$county.province',
        },
      },
    ])
    .exec();
