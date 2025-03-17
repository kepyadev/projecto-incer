import {
  createAnimalType,
  createManyAnimalType,
  deleteAnimalType,
  getAllAnimalType,
  updateAnimalType,
} from '../repositories/NoSql/animal-type.repository';
import { AnimalTypeDTO } from '../types/animal-type';

export const getAllAnimalTypeService = () => getAllAnimalType();

export const getAnimalTypeByIdService = (
  id: string,
  getAnimalTypeById: (id: string) => Promise<any>
) => getAnimalTypeById(id);

export const createAnimalTypeService = (data: AnimalTypeDTO) => createAnimalType(data);

export const createManyAnimalTypeService = (data: AnimalTypeDTO[]) => createManyAnimalType(data);

export const deleteAnimalTypeService = (id: string) => deleteAnimalType(id);

export const updateAnimalTypeService = (id: string, data: AnimalTypeDTO) =>
  updateAnimalType(id, data);
