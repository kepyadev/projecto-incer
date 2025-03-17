import {
  createAnimal,
  deleteAnimal,
  getAllAnimal,
  getAllAnimalByProducer,
  getAnimalByCooperative,
  getAnimalByFazenda,
} from '../repositories/NoSql/animal.repository';
import { IFetchParams } from '../types';
import { AnimalDTO, IAnimal } from '../types/animal';

export const getAllAnimalService = () => getAllAnimal();

export const createAnimalService = (animal: AnimalDTO) => createAnimal(animal);

export const deleteAnimalService = (id: string) => deleteAnimal(id);

export const getAnimalByFazendaService = (fazendaId: string, fetchParams: IFetchParams) =>
  getAnimalByFazenda(fazendaId, fetchParams);

export const getAllAnimalByCooperativeService = (cooperativeId: string) =>
  getAnimalByCooperative(cooperativeId);

export const getAllAnimalByProducerService = (
  producerId: string
): Promise<{ count: number; data: IAnimal[] }> => getAllAnimalByProducer(producerId);
