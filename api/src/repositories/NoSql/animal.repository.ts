import { FilterQuery, Types } from 'mongoose';

import { IsDeleted } from '../../constants';
import Animal from '../../constants/animal';
import animalModel from '../../entities/animal.model';
import { IFetchParams } from '../../types';
import { AnimalDTO, IAnimal } from '../../types/animal';
import { deleteEntity, getAllItens } from './repository-helper';

export const getAllAnimal = () =>
  animalModel
    .find({ [IsDeleted]: false })
    .populate(Animal.Type)
    .exec();

export const createAnimal = (animal: AnimalDTO) => animalModel.create(animal);

export const deleteAnimal = (id: string) =>
  deleteEntity<IAnimal>(animalModel, { [Animal.Id]: id } as FilterQuery<IAnimal>);

export const getAnimalByFazenda = (fazendaId: string, fetchParams: IFetchParams) =>
  getAllItens(
    animalModel,
    fetchParams,
    {
      [Animal.Fazenda]: fazendaId,
    },
    {},
    false,
    { path: Animal.Type }
  );

export const getAnimalByCooperative = (cooperativeId: string) =>
  animalModel.aggregate([
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

export const getAllAnimalByProducer = async (
  producerId: string
): Promise<{ count: number; data: IAnimal[] }> => {
  const animal = await animalModel.aggregate<IAnimal>([
    {
      $lookup: {
        from: 'animal_types',
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
    count: animal.length,
    data: animal,
  };
};
