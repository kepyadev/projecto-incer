import { owner } from '../constants';
import Animal from '../constants/animal';
import { IAnimalType } from './animal-type';

export interface IAnimal {
  [Animal.Id]: String;
  [Animal.Type]: IAnimalType;
  [Animal.Matrizes]: Number;
  [Animal.EffectiveTotal]: Number;
  [Animal.AnnualProdution]: Number;
  [Animal.YearOfProdution]: Number;
  [Animal.Fazenda]: String;
}

export interface AnimalDTO {
  [Animal.Type]: String;
  [Animal.Matrizes]: Number;
  [Animal.EffectiveTotal]: Number;
  [Animal.AnnualProdution]: Number;
  [Animal.YearOfProdution]: Number;
  [Animal.Fazenda]: String;
  [Animal.Egg]: Number;
  [owner]: string;
}
