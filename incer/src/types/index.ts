import { Comuna, County, Province } from '../constants/entities';
import {
  Alfaia,
  Animal,
  AnimalType,
  ContactInformation,
  Equipamento,
  Geo,
  Ground,
  HumanResource,
  HumanResourceType,
  Infraestrutura,
  InfraestruturaType,
  Localization,
  Machine,
  MachineType,
  MeioEstacionario,
  MeioEstacionarioType,
  Power,
} from '../constants/sub-entites';

export enum EntityKeys {
  Id = '_id',
}
export type Entity = Record<string, unknown> & { [EntityKeys.Id]: string };

export interface IContactInformation {
  [ContactInformation.Phone]: number;
  [ContactInformation.Email]?: string;
}

export interface IGeo {
  [Geo.Latitude]: number;
  [Geo.Longitude]: number;
}

export interface IGround {
  [Ground.AltitudeMedia]: number;
  [Ground.Orografia]: string;
  [Ground.PropriedadesFisicas]: string;
  [Ground.PhMedio]: number;
  [Ground.AreaCorrigida]: number;
  [Ground.SomaBases]?: number;
  [Ground.ctc]?: number;
  [Ground.indiceALuminio]?: number;
  [Ground.indiceSodio]?: number;
}

export interface IProvince {
  [Province.Id]: string;
  [Province.Description]: string;
  [Province.Countys]: ICounty[];
}

export interface IComuna {
  [Comuna.Id]: string;
  [Comuna.Description]: string;
  [Comuna.County]?: ICounty;
}
export interface ICounty {
  [County.Id]: string;
  [County.Description]: string;
  // [County.Comunas]: IComuna[];
  [County.Province]?: IProvince;
}

export interface ILocalization {
  [Localization.Comuna]: IComuna;
}

export type PowerUnidade = 'Watts' | 'pH';

interface IPower {
  [Power.Unidade]: PowerUnidade;
  [Power.Value]: number;
}
export interface IMachineTypeData {
  [MachineType.Description]: string;
}
export interface IMachineType {
  [MachineType.Id]: string;
  [MachineType.Description]: string;
}
export interface IMachine {
  [Machine.Id]: string;
  [Machine.Type]: IMachineType;
  [Machine.Power]: IPower;
  [Machine.Quantity]: number;
}

export interface IEquipamentoTypeData {
  [Alfaia.Description]: string;
}

export interface IEquipamentoType {
  [Alfaia.Id]: string;
  [Alfaia.Description]: string;
}
export interface IEquipamentoData {
  [Equipamento.Alfaia]: IEquipamentoType;
  [Equipamento.Caracteristicas]: string;
  [Equipamento.Quantity]: number;
}
export interface IEquipamento {
  [Equipamento.Id]: string;
  [Equipamento.Alfaia]: IEquipamentoType;
  [Equipamento.Caracteristicas]: string;
  [Equipamento.Quantity]: number;
}

export interface IInfraestruturaType {
  [InfraestruturaType.Id]: string;
  [InfraestruturaType.Description]: string;
}
export interface IInfraestruturaTypeDTO {
  [InfraestruturaType.Description]: string;
}

export interface IInfraestrutura {
  [Infraestrutura.Id]: string;
  [Infraestrutura.Type]: IInfraestruturaType;
  [Infraestrutura.Quantity]: number;
  [Infraestrutura.Capacity]: string;
  [Infraestrutura.Unidade]: string;
}

export interface InfraestruturaDTO {
  [Infraestrutura.Type]: string;
  [Infraestrutura.Capacity]: string;
  [Infraestrutura.Quantity]: number;
  [Infraestrutura.Unidade]: string;
  [Infraestrutura.Fazenda]: string;
}

export interface AnimalTypeDTO {
  [AnimalType.Description]: string;
  [AnimalType.IsAve]: boolean;
}

export interface IAnimalType {
  [AnimalType.Id]: string;
  [AnimalType.Description]: string;
  [AnimalType.IsAve]: boolean;
}

export interface IAnimal {
  [Animal.Id]: string;
  [Animal.Type]: IAnimalType;
  [Animal.EfectivoTotal]: number;
  [Animal.Matrizes]: number;
  [Animal.ProducaoAnual]: number;
  [Animal.AnoProducao]: number;
  [Animal.QuantidadeOvos]?: number;
}

export interface AnimalDTO {
  [Animal.Type]: string;
  [Animal.EfectivoTotal]: number;
  [Animal.Matrizes]: number;
  [Animal.ProducaoAnual]: number;
  [Animal.AnoProducao]: number;
  [Animal.FazendaId]: string;
  [Animal.QuantidadeOvos]?: Number;
}

export interface MachineDTO {
  [Machine.Type]: string;
  [Machine.FazendaId]: string;
  [Machine.Power]: IPower;
  [Machine.Quantity]: number;
}

export interface EquipamentoDTO {
  [Equipamento.Alfaia]: string;
  [Equipamento.Caracteristicas]: string;
  [Equipamento.Quantity]: number;
  [Equipamento.FazendaId]: string;
}

export interface IHumanResourceType {
  [HumanResourceType.Id]: string;
  [HumanResourceType.Description]: string;
}
export interface HumanResourceTypeDTO {
  [HumanResourceType.Description]: string;
}

export interface IHumanResource {
  [HumanResource.Id]: string;
  [HumanResource.Type]: IHumanResourceType;
  [HumanResource.Quantity]: number;
}

export interface HumanResourceDTO {
  [HumanResource.FazendaId]: string;
  [HumanResource.Type]: string;
  [HumanResource.Quantity]: number;
}

export interface IMeioEstacionarioType {
  [MeioEstacionarioType.Id]: string;
  [MeioEstacionarioType.Description]: string;
}
export interface MeioEstacionarioTypeDTO {
  [MeioEstacionarioType.Description]: string;
}

export interface IMeioEstacionario {
  [MeioEstacionario.Id]: string;
  [MeioEstacionario.Type]: IMeioEstacionarioType;
  [MeioEstacionario.PowerValue]: IPower;
  [MeioEstacionario.Quantity]: number;
}

export interface MeioEstacionarioDTO {
  [MeioEstacionario.Type]: string;
  [MeioEstacionario.PowerValue]: IPower;
  [MeioEstacionario.Quantity]: number;
  [MeioEstacionario.FazendaId]: string;
}

export * from './user';
export * from './services';
export * from './fazenda';
export * from './culture';
export * from './cooperative';
export * from './producer';
export * from './partner';
export * from './ministerio';
export * from './logs';
export * from './nationalProduction';
export * from './NationalMarketPrices';
export * from './ImportedProducts';
export * from './province';
export * from './county';
