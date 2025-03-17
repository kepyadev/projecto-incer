import { Types } from 'mongoose';

import { Cooperative, County, Entities, Fazenda, province, User } from '../../constants';
import { Producer } from '../../constants/producer';
import porducerModel from '../../entities/producer.model';
import { IFetchParams } from '../../types';
import { IProducer, ProducerDTO } from '../../types/producer';
import { getAllItens } from './repository-helper';

export const createProducer = (producer: ProducerDTO) => porducerModel.create(producer);

export const linkWithCooperative = async (cooperativeId: string, shortCode: string) => {
  const updateValue = {
    $set: { [Producer.cooperativeId]: cooperativeId, [Producer.shortCode]: shortCode },
  } as any;

  console.log(`Procurando produtor com shortCode: ${shortCode}`);
  const producer = (
    await porducerModel.find({ [Producer.shortCode]: shortCode } as any).populate('user')
  )[0];

  if (!producer) {
    console.error('Produtor não encontrado');
    throw new Error('Lamentamos, Produtor não encontrado');
  }

  if (producer[Producer.cooperativeId]) {
    console.error('Produtor já vinculado a outra cooperativa');
    throw new Error(
      'Lamentamos, não é possivel vincular este produtor pois, tem vinculação activa a outra cooperativa!'
    );
  }

  console.log(
    `já existe um produtor com o email: ${producer.user.email} na cooperativa: ${cooperativeId}`
  );
  const existingProducerWithEmail = await porducerModel.findOne({
    'user.email': producer.user.email,
    [Producer.cooperativeId]: cooperativeId,
  });

  if (existingProducerWithEmail) {
    console.error('Já existe um produtor com o mesmo email na cooperativa');
    throw new Error(
      'Lamentamos, não é possível vincular este produtor pois já existe outro produtor com o mesmo email associado a esta cooperativa!'
    );
  }

  console.log(`Atualizando produtor com ID: ${producer.id}`);
  await producer.updateOne(updateValue);
  return producer;
};

export const unlinkCooperative = async (cooperativeId: string, producerId: string) => {
  const updateValue = { $unset: { [Producer.cooperativeId]: 1 } };

  const producer = await porducerModel.findById(producerId);

  if (!producer) throw new Error('Lamentamos, Productor não encontrado');

  // eslint-disable-next-line eqeqeq
  if (String(producer[Producer.cooperativeId]) !== String(cooperativeId))
    throw new Error('Lamentamos, o productor não se encontra vinculado a esta cooperativa');

  return producer.updateOne(updateValue);
};

export const findProducerById = async (id: string): Promise<IProducer> => {
  const producer = await porducerModel
    .aggregate([
      {
        $match: {
          [Producer.id]: new Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: Producer.userId,
          foreignField: User.id,
          as: 'user',
          pipeline: [
            {
              $project: {
                [User.id]: 0,
                [User.password]: 0,
                [User.status]: 0,
                __v: 0,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: '$user',
        },
      },
      {
        $lookup: {
          from: 'fazendas',
          localField: '_id',
          foreignField: 'producer_id',
          as: 'fazendas',
        },
      },
    ])
    .exec();

  if (producer && producer.length) {
    return producer[0];
  }

  throw new Error('Produtor nao encontrado!');
};

export const findAllProducerWithCooperative = async () => {
  const producers = await porducerModel
    .aggregate([
      {
        $lookup: {
          from: 'users',
          localField: Producer.userId,
          foreignField: User.id,
          as: 'user',
          pipeline: [
            {
              $project: {
                [User.id]: 0,
                [User.password]: 0,
                [User.status]: 0,
                __v: 0,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: '$user',
        },
      },
      {
        $lookup: {
          from: 'cooperatives',
          localField: Producer.cooperativeId,
          foreignField: Cooperative.id,
          as: 'cooperative',
        },
      },
      {
        $unwind: {
          path: `$cooperative`,
        },
      },
    ])
    .exec();

  return { data: producers, count: producers.length };
};

export const findProducerByIdWithoutFazendas = (id: string) =>
  porducerModel
    .aggregate([
      {
        $match: {
          [Producer.id]: new Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: Producer.userId,
          foreignField: User.id,
          as: 'user',
          pipeline: [
            {
              $project: {
                [User.id]: 0,
                [User.password]: 0,
                [User.status]: 0,
                __v: 0,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: '$user',
        },
      },
      {
        $lookup: {
          from: 'cooperatives',
          localField: Producer.cooperativeId,
          foreignField: Cooperative.id,
          as: 'cooperative',
        },
      },
      {
        $unwind: {
          path: `$cooperative`,
        },
      },
    ])
    .exec();

export const findProducerByIdOnly = (id: string) =>
  porducerModel
    .aggregate([
      {
        $match: {
          [Producer.id]: new Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: Producer.userId,
          foreignField: User.id,
          as: 'user',
          pipeline: [
            {
              $project: {
                [User.id]: 0,
                [User.password]: 0,
                [User.status]: 0,
                __v: 0,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: '$user',
        },
      },
    ])
    .exec();

export const findProducerByUser = (userId: string) =>
  porducerModel.findOne({ [Producer.userId]: new Types.ObjectId(userId) } as any);

export const findProducerByUserShortCode = (shortCode: string) =>
  porducerModel.findOne({ [Producer.shortCode]: shortCode } as any);

export const findAllProducer = async (_fetchParams?: IFetchParams) =>
  getAllItens(porducerModel, undefined, {}, undefined, false, [
    { path: Producer.cooperativeId },
    { path: Producer.userId, populate: { path: Producer.county, populate: { path: 'province' } } },
  ]);

export const findAllProducersByCooperative = async (
  cooperativeId: string,
  filter?: Record<string, any>
) => {
  const p = await porducerModel
    .find({ [Producer.cooperativeId]: cooperativeId, ...filter } as any)
    .populate({
      path: Entities.User,
      populate: { path: Entities.County, populate: { path: Entities.Province } },
    })
    .populate(Entities.Cooperative);

  return { data: p, count: p.length };
};

export const findAllProducersOfMyCooperative = async (userId: string) => {
  const producers = await porducerModel
    .aggregate([
      {
        $lookup: {
          from: 'cooperatives',
          localField: Producer.cooperativeId,
          foreignField: Cooperative.id,
          as: 'cooperative',
        },
      },
      {
        $unwind: {
          path: '$cooperative',
        },
      },
      {
        $match: {
          'cooperative.user': new Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: Producer.userId,
          foreignField: User.id,
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
        },
      },
      {
        $project: {
          'user.status': 0,
          'user.password': 0,
          'user.createdAt': 0,
          'user.updatedAt': 0,
        },
      },
      {
        $set: {
          'user.name': { $concat: ['$user.first_name', ' ', '$user.last_name'] },
        },
      },
      {
        $lookup: {
          from: 'fazendas',
          localField: Producer.id,
          foreignField: Fazenda.ProducerId,
          as: 'fazendas',
        },
      },
    ])
    .exec();
  return { data: producers, count: producers.length };
};

export const findOneProducerByCooperative = (cooperativeId: string, producerId: string) =>
  porducerModel
    .aggregate([
      {
        $match: {
          [Producer.cooperativeId]: new Types.ObjectId(cooperativeId),
          [Producer.id]: new Types.ObjectId(producerId),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: Producer.userId,
          foreignField: '_id',
          as: 'user',
          pipeline: [
            {
              $project: {
                [User.id]: 0,
                [User.password]: 0,
                [User.status]: 0,
                __v: 0,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: '$user',
        },
      },
      {
        $project: {
          [Producer.cooperativeId]: 0,
        },
      },
      { $limit: 1 },
      {
        $lookup: {
          from: 'fazendas',
          localField: '_id',
          foreignField: 'producer_id',
          as: 'fazendas',
        },
      },
    ])
    .exec();

export const getMyCooperative = (id: string) =>
  porducerModel
    .aggregate([
      {
        $match: {
          user: new Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'cooperatives',
          localField: Producer.cooperativeId,
          foreignField: Cooperative.id,
          as: Producer.cooperativeId,
        },
      },
      {
        $unwind: {
          path: '$cooperative',
        },
      },
      {
        $lookup: {
          from: 'counties',
          localField: `cooperative.${Cooperative.county}`,
          foreignField: County.Id,
          as: `cooperative.${Cooperative.county}`,
        },
      },
      {
        $unwind: {
          path: '$cooperative.county',
        },
      },
      {
        $lookup: {
          from: 'provinces',
          localField: 'cooperative.county.province',
          foreignField: province.Id,
          as: 'cooperative.county.province',
        },
      },
      {
        $unwind: {
          path: '$cooperative.county.province',
        },
      },
    ])
    .exec();
export const findFinProducerByNif = async (nif: string) =>
  porducerModel.findOne({ [Producer.nif]: nif });

export const updatePeroducerByid = async (userId: string, data: any) => {
  const producer = await porducerModel.findOne({
    [Producer.userId]: new Types.ObjectId(userId),
  } as any);
  return producer?.updateOne({ nif: data[Producer.nif] });
};
