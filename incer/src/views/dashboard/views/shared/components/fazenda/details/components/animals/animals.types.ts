import { ICell } from '../../../../../../../../../components/generic-table/table.types';
import {
  Animal,
  AnimalType,
} from '../../../../../../../../../constants/sub-entites';
import { Entity, IAnimal } from '../../../../../../../../../types';
import { formatNumberDecimal } from '../../../../../../../../../utils';

export interface AnimalsProps {
  fazendaId: string;
}

export const cells: ICell[] = [
  { id: Animal.Type, label: 'Tipo', numeric: false },
  { id: Animal.EfectivoTotal, label: 'Efectivo total', numeric: false },
  { id: Animal.Matrizes, label: 'Matrizes', numeric: false },
  { id: Animal.ProducaoAnual, label: 'Produção anual', numeric: false },
  { id: Animal.QuantidadeOvos, label: 'Quantidade de ovoss', numeric: false },
  { id: Animal.AnoProducao, label: 'Ano de produção', numeric: false },
];

export const animalModifier = (data: ReadonlyArray<Entity>) => {
  return (data as unknown as IAnimal[]).map(animal => {
    return {
      ...animal,
      [Animal.Type]: animal[Animal.Type][AnimalType.Description],
      [Animal.EfectivoTotal]: formatNumberDecimal(animal[Animal.EfectivoTotal]),
      [Animal.Matrizes]: formatNumberDecimal(animal[Animal.Matrizes]),
      [Animal.QuantidadeOvos]: animal[Animal.QuantidadeOvos]
        ? formatNumberDecimal(animal[Animal.QuantidadeOvos]!)
        : '-',
      [Animal.ProducaoAnual]: `${formatNumberDecimal(
        animal[Animal.ProducaoAnual]
      )} t`,
      [Animal.AnoProducao]: animal[Animal.AnoProducao],
    };
  });
};
