import { AnimalType } from '../constants/animal-type';

export interface IAnimalType {
  [AnimalType.Id]: String;
  [AnimalType.Description]: String;
  [AnimalType.IsAve]: Boolean;
}

export interface AnimalTypeDTO {
  [AnimalType.Description]: String;
  [AnimalType.IsAve]: Boolean;
}

export const AnimalTypeFields = [AnimalType.Description, AnimalType.IsAve];
export const AnimalTypeRequiredFields = [AnimalType.Description, AnimalType.IsAve];
