import { FilterQuery } from 'mongoose';

import { IsDeleted } from '../../constants';
import { AnimalType } from '../../constants/animal-type';
import animalTypeModel from '../../entities/animal-type.model';
import { AnimalTypeDTO, IAnimalType } from '../../types/animal-type';
import { createMany, deleteEntity, getAllItens, updateGeneric } from './repository-helper';

// eslint-disable-next-line import/prefer-default-export
export const getAllAnimalType = () => getAllItens(animalTypeModel, undefined);

export const getAnimalTypeById = (id: string) =>
  animalTypeModel
    .findOne({ [IsDeleted]: { $ne: true }, [AnimalType.Id]: id } as FilterQuery<IAnimalType>)
    .exec();

export const createAnimalType = (data: AnimalTypeDTO) => animalTypeModel.create(data);

export const createManyAnimalType = (data: AnimalTypeDTO[]) => createMany(animalTypeModel, data);

export const deleteAnimalType = (id: string) =>
  deleteEntity<IAnimalType>(animalTypeModel, { [AnimalType.Id]: id } as FilterQuery<IAnimalType>);

export const updateAnimalType = (id: string, data: AnimalTypeDTO) =>
  updateGeneric(animalTypeModel, id, data);
