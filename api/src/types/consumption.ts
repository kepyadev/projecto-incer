import { ImportedProductsTypes } from '../constants';

// Tipo para os dados básicos de produtos importados
export interface IImportedProductsData {
  [ImportedProductsTypes.Product]: string;
  [ImportedProductsTypes.Year]: number;
  [ImportedProductsTypes.OriginCountry]: string;
  [ImportedProductsTypes.QuantityImported]: number;
  [ImportedProductsTypes.MarketPrice]: number;
}

// Tipo completo para produtos importados, incluindo o ID
export type IImportedProducts = IImportedProductsData & {
  [ImportedProductsTypes.Id]: string;
};

// Tipo para DTO (Data Transfer Object) de produtos importados
export interface ImportedProductsDTO {
  [ImportedProductsTypes.Product]: string;
  [ImportedProductsTypes.Year]: number;
  [ImportedProductsTypes.OriginCountry]: string;
  [ImportedProductsTypes.QuantityImported]: number;
  [ImportedProductsTypes.MarketPrice]: number;
}

export const ImportedProductRequiredFields = [
  ImportedProductsTypes.Product,
  ImportedProductsTypes.Year,
  ImportedProductsTypes.OriginCountry,
  ImportedProductsTypes.QuantityImported,
  ImportedProductsTypes.MarketPrice,
];
export const ImportedProductFields = [
  ImportedProductsTypes.Product,
  ImportedProductsTypes.Year,
  ImportedProductsTypes.OriginCountry,
  ImportedProductsTypes.QuantityImported,
  ImportedProductsTypes.MarketPrice,
];
