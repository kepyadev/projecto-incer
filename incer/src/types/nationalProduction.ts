import { NationalProductionType } from '../constants/entities'; // Ajuste o caminho conforme necessário

// Tipo para os dados básicos de produção nacional
export interface INationalProductionData {
  [NationalProductionType.Product]: string;
  [NationalProductionType.Year]: number;
  [NationalProductionType.QuantityProduced]: number;
  [NationalProductionType.AveragePrice]: number;
  [NationalProductionType.Region]: string;
}

// Tipo completo para produção nacional, incluindo o ID
export type INationalProduction = INationalProductionData & {
  [NationalProductionType.Id]: string;
};

// Tipo para DTO (Data Transfer Object) de produção nacional
export interface NationalProductionDTO {
  [NationalProductionType.Product]: string;
  [NationalProductionType.Year]: number;
  [NationalProductionType.QuantityProduced]: number;
  [NationalProductionType.AveragePrice]: number;
  [NationalProductionType.Region]: string;
}
