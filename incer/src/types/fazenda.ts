import { Fazenda } from '../constants/entities';
import {
  IAnimal,
  IContactInformation,
  ICounty,
  IEquipamento,
  IGeo,
  IGround,
  IHumanResource,
  IInfraestrutura,
  IMachine,
  IMeioEstacionario,
} from '.';
import { ICulture } from './culture';
import { IProducer } from './producer';

export interface IFazendaData {
  [Fazenda.Descricao]: string;
  [Fazenda.Nif]: string;
  [Fazenda.Gerencia]: string;
  [Fazenda.Contact]: IContactInformation;
  [Fazenda.Estradanacional]: string;
  [Fazenda.DistanciaEstrada]: number;
  [Fazenda.Geo]: IGeo;
  [Fazenda.Ground]: IGround;
  [Fazenda.Address]?: string;
  [Fazenda.Extension]: number;
  [Fazenda.County]: ICounty;
}

export type IFazenda = {
  [Fazenda.Id]: string;
  [Fazenda.Producer]: IProducer;
  [Fazenda.MeiosEstacionarios]?: IMeioEstacionario[];
  [Fazenda.Machines]?: IMachine[];
  [Fazenda.Equipamentos]?: IEquipamento[];
  [Fazenda.Infraestruturas]?: IInfraestrutura[];
  [Fazenda.Animals]?: IAnimal[];
  [Fazenda.HumanResource]?: IHumanResource[];
  [Fazenda.Culturas]?: ICulture[];
  [Fazenda.County]: ICounty;
  [Fazenda.Cooperative]?: string;
  [Fazenda.CreatedAt]: string;
} & IFazendaData;
