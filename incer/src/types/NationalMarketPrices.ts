import { NationalMarketPricesTypes } from '../constants/entities'; // Ajuste o caminho conforme necessário

// Tipo para os dados básicos de preços de mercado nacional
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
