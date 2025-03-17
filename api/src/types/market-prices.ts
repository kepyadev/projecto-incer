import { NationalMarketPricesTypes } from '../constants';

export interface INationalMarketPricesData {
  [NationalMarketPricesTypes.Product]: string;
  [NationalMarketPricesTypes.Year]: number;
  [NationalMarketPricesTypes.AveragePrice]: number;
  [NationalMarketPricesTypes.Region]: string;
}

// Tipo completo para preços de mercado nacional, incluindo o ID
export type INationalMarketPrices = INationalMarketPricesData & {
  [NationalMarketPricesTypes.Id]: string;
};

// Tipo para DTO (Data Transfer Object) de preços de mercado nacional
export interface NationalMarketPricesDTO {
  [NationalMarketPricesTypes.Product]: string;
  [NationalMarketPricesTypes.Year]: number;
  [NationalMarketPricesTypes.AveragePrice]: number;
  [NationalMarketPricesTypes.Region]: string;
}

export const NationalMarketPriceRequiredFields = [
  NationalMarketPricesTypes.Product,
  NationalMarketPricesTypes.Year,
  NationalMarketPricesTypes.AveragePrice,
  NationalMarketPricesTypes.Region,
];
export const NationalMarketPriceFields = [
  NationalMarketPricesTypes.Product,
  NationalMarketPricesTypes.Year,
  NationalMarketPricesTypes.AveragePrice,
  NationalMarketPricesTypes.Region,
];
