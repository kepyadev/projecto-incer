import { ICell } from '../../../../../../../components/generic-table/table.types';
import { ImportedProductsTypes } from '../../../../../../../constants/entities';
import { Entity } from '../../../../../../../types';
import { IImportedProducts } from '../../../../../../../types/ImportedProducts';
import { formatNumberDecimal } from '../../../../../../../utils';

// eslint-disable-next-line import/prefer-default-export
export const cells: ICell[] = [
  { id: ImportedProductsTypes.Product, label: 'Produto', numeric: false },
  {
    id: ImportedProductsTypes.MarketPrice,
    label: 'Preço de mercado',
    numeric: false,
  },
  {
    id: ImportedProductsTypes.QuantityImported,
    label: 'Quantidade importada',
    numeric: false,
  },
  {
    id: ImportedProductsTypes.OriginCountry,
    label: 'País de origem',
    numeric: false,
  },
  { id: ImportedProductsTypes.Year, label: 'Ano', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity> | undefined) => {
  return (data as unknown as IImportedProducts[])?.map(ImportedProduct => ({
    ...ImportedProduct,
    [ImportedProductsTypes.QuantityImported]: `${formatNumberDecimal(
      ImportedProduct[ImportedProductsTypes.QuantityImported]
    )} t`,
    [ImportedProductsTypes.MarketPrice]: formatNumberDecimal(
      ImportedProduct[ImportedProductsTypes.MarketPrice]
    ),
  }));
};
