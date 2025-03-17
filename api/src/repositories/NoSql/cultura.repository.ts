import { Types } from 'mongoose';

import { County, Cultura, Fazenda } from '../../constants';
import cultureModel from '../../entities/culture.model';
import { IFetchParams } from '../../types';
import { ICultura, ICulturaDTO } from '../../types/cultura';
import { getAllItens } from './repository-helper';

// eslint-disable-next-line import/prefer-default-export
export const createCultura = (cultura: ICulturaDTO) => cultureModel.create(cultura);

export const getCultureByCooperative = (cooperativeId: string) =>
  getAllItens(
    cultureModel,
    undefined,
    {
      [Cultura.cooperative]: new Types.ObjectId(cooperativeId),
    },
    {},
    false,
    [{ path: Cultura.fazendaId }, { path: Cultura.type }]
  );

export const getAllCulture = (fetchParams: IFetchParams | undefined) =>
  getAllItens(cultureModel, fetchParams, {}, {}, false, [
    {
      path: Cultura.fazendaId,
      populate: { path: Fazenda.County, populate: { path: County.ProvinceId } },
    },
    { path: Cultura.type },
  ]);

export const getCultureById = (id: string) => cultureModel.findById(id).exec();

export const getCultureByFazenda = (fazendaId: string, fetchParams: IFetchParams) =>
  getAllItens(
    cultureModel,
    fetchParams,
    {
      [Cultura.fazendaId]: fazendaId,
    },
    {},
    false,
    { path: Cultura.type }
  );

export const getAllCultureByProducer = async (
  producerId: string
): Promise<{ count: number; data: ICultura[] }> => {
  const culture = await cultureModel.aggregate<ICultura>([
    {
      $lookup: {
        from: 'cultura_types',
        localField: 'type',
        foreignField: '_id',
        as: 'type',
      },
    },
    {
      $unwind: {
        path: '$type',
      },
    },
    {
      $lookup: {
        from: 'fazendas',
        localField: 'fazenda',
        foreignField: '_id',
        as: 'fazenda',
      },
    },
    {
      $unwind: {
        path: '$fazenda',
      },
    },
    {
      $lookup: {
        from: 'producers',
        localField: 'fazenda.producer_id',
        foreignField: '_id',
        as: 'fazenda.producer_id',
      },
    },
    {
      $unwind: {
        path: '$fazenda.producer_id',
      },
    },
    {
      $match: {
        'fazenda.producer_id._id': new Types.ObjectId(producerId),
      },
    },
  ]);
  return {
    count: culture.length,
    data: culture,
  };
};

export const getAllCultureByCooperative = async (
  cooperativeId: string
): Promise<{ count: Number; data: ICultura[] }> => {
  const cultureResponse = await cultureModel.aggregate([
    {
      $lookup: {
        from: 'fazendas',
        localField: 'fazenda',
        foreignField: '_id',
        as: 'fazenda',
      },
    },
    {
      $unwind: {
        path: '$fazenda',
      },
    },
    {
      $lookup: {
        from: 'producers',
        localField: 'fazenda.producer_id',
        foreignField: '_id',
        as: 'fazenda.producer_id',
      },
    },
    {
      $unwind: {
        path: '$fazenda.producer_id',
      },
    },
    {
      $match: {
        'fazenda.producer_id.cooperative': new Types.ObjectId(cooperativeId),
      },
    },
  ]);

  return { count: cultureResponse.length, data: cultureResponse };
};
