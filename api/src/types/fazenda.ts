import { Fazenda, owner } from '../constants';
import { IContactInformation, IGeo, IGround } from '.';
import { ICounty } from './County';
import { IProducer } from './producer';

export interface IFazendaData {
  [Fazenda.Contact]: IContactInformation;
  [Fazenda.Descricao]: String;
  [Fazenda.Gerencia]: String;
  [Fazenda.County]: string;
  [Fazenda.Estradanacional]: String;
  [Fazenda.DistanciaEstrada]: number;
  [Fazenda.Ground]: IGround;
  [Fazenda.Nif]: String;
  [Fazenda.IsDeleted]: Boolean;
  [Fazenda.Geo]: IGeo;
  [Fazenda.ProducerId]: String;
  [owner]: string;
}

export interface IFazenda {
  [Fazenda.Id]: String;
  [Fazenda.Contact]: IContactInformation;
  [Fazenda.Descricao]: String;
  [Fazenda.Gerencia]: String;
  [Fazenda.County]: ICounty;
  [Fazenda.Estradanacional]: String;
  [Fazenda.DistanciaEstrada]: number;
  [Fazenda.Ground]: IGround;
  [Fazenda.Nif]: String;
  [Fazenda.IsDeleted]: Boolean;
  [Fazenda.Geo]: IGeo;
  [Fazenda.ProducerId]: IProducer;
  [Fazenda.Cultura]: String[];
  [Fazenda.Machines]: String[];
  [Fazenda.Equipamentos]: String[];
  [Fazenda.Infrastructure]: String[];
  [Fazenda.Animals]: String[];
  [Fazenda.MeioEstacionario]: String[];
  [Fazenda.HumanResource]: String[];
}

export const FazendaRequiredFields = [
  Fazenda.Descricao,
  Fazenda.Nif,
  Fazenda.Contact,
  Fazenda.Gerencia,
  Fazenda.DistanciaEstrada,
  Fazenda.Estradanacional,
  Fazenda.ProducerId,
  Fazenda.Ground,
  Fazenda.Geo,
  Fazenda.County,
  Fazenda.Extension,
];

export const FazendaFields = [
  Fazenda.Id,
  Fazenda.Descricao,
  Fazenda.Nif,
  Fazenda.Contact,
  Fazenda.Gerencia,
  Fazenda.DistanciaEstrada,
  Fazenda.Estradanacional,
  Fazenda.ProducerId,
  Fazenda.Ground,
  Fazenda.Geo,
  Fazenda.County,
  Fazenda.Equipamentos,
  Fazenda.Extension,
  owner,
];
