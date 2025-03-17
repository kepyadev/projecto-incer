import { ImportedProductsTypes } from '../constants/entities'; // Ajuste o caminho conforme necessário

// Tipo para os dados básicos de produtos importados
export interface IImportedProductsData {
  [ImportedProductsTypes.Id]?: string;
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
  [ImportedProductsTypes.Id]?: string;
  [ImportedProductsTypes.Product]: string;
  [ImportedProductsTypes.Year]: number;
  [ImportedProductsTypes.OriginCountry]: string;
  [ImportedProductsTypes.QuantityImported]: number;
  [ImportedProductsTypes.MarketPrice]: number;
}
