import { ICell } from '../../../../../../../components/generic-table/table.types';
import { NationalMarketPricesTypes } from '../../../../../../../constants/entities';
import { Entity } from '../../../../../../../types';
import { INationalMarketPrices } from '../../../../../../../types/NationalMarketPrices';
import { formatNumberDecimal } from '../../../../../../../utils';

// eslint-disable-next-line import/prefer-default-export
export const cells: ICell[] = [
  { id: NationalMarketPricesTypes.Product, label: 'Produto', numeric: false },
  {
    id: NationalMarketPricesTypes.AveragePrice,
    label: 'Preço Médio',
    numeric: false,
  },
  { id: NationalMarketPricesTypes.Region, label: 'Região', numeric: false },
  { id: NationalMarketPricesTypes.Year, label: 'Ano', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity> | undefined) => {
  return (data as unknown as INationalMarketPrices[])?.map(nationalMarketPrices => ({
    ...nationalMarketPrices,
    [NationalMarketPricesTypes.AveragePrice]: `${formatNumberDecimal(
      nationalMarketPrices[NationalMarketPricesTypes.AveragePrice]
    )} Kz`,
  }));
};
