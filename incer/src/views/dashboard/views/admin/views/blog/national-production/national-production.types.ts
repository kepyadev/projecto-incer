import { ICell } from '../../../../../../../components/generic-table/table.types';
import { NationalProductionType } from '../../../../../../../constants/entities';
import { Entity } from '../../../../../../../types';
import { INationalProduction } from '../../../../../../../types/nationalProduction';
import { formatNumberDecimal } from '../../../../../../../utils';

// eslint-disable-next-line import/prefer-default-export
export const cells: ICell[] = [
  { id: NationalProductionType.Product, label: 'Produto', numeric: false },
  {
    id: NationalProductionType.QuantityProduced,
    label: 'Quantidade produzida',
    numeric: false,
  },
  { id: NationalProductionType.AveragePrice, label: 'Preço médio', numeric: false },
  { id: NationalProductionType.Region, label: 'Região', numeric: false },
  { id: NationalProductionType.Year, label: 'Ano', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity> | undefined) => {
  return (data as unknown as INationalProduction[])?.map(nationalProduction => ({
    ...nationalProduction,
    [NationalProductionType.AveragePrice]: `${formatNumberDecimal(
      nationalProduction[NationalProductionType.AveragePrice]
    )} Kz`,

    [NationalProductionType.Product]:
      nationalProduction[NationalProductionType.Product],
    [NationalProductionType.QuantityProduced]: `${
      nationalProduction[NationalProductionType.QuantityProduced]
    } t`,
    [NationalProductionType.Region]:
      nationalProduction[NationalProductionType.Region],
    [NationalProductionType.Year]: nationalProduction[NationalProductionType.Year],
  }));
};
