import { Cooperative } from '../constants/entities';
import { ContactInformation } from '../constants/sub-entites';
import { IContactInformation, ICounty } from '.';
import { ICulture } from './culture';
import { IProducer } from './producer';

export interface ICooperativeData {
  [Cooperative.Description]: string;
  [Cooperative.Contact]: {
    [ContactInformation.Phone]: string;
  };
  [Cooperative.Address]: string;
  [Cooperative.County]: ICounty;
  [Cooperative.Cultures]: ICulture[];
  [Cooperative.Presindet]: string;
  [Cooperative.Desvinculados]?: IProducer[];
  [Cooperative.TotalAgregate]?: number;
  [Cooperative.TotalDesvinculados]?: number;
  [Cooperative.isCooperative]: boolean;
}

export interface ICooperativeDTO {
  [Cooperative.Description]: string;
  [Cooperative.Contact]: IContactInformation;
  [Cooperative.Address]: string;
  [Cooperative.County]: string;
  [Cooperative.Presindet]: string;
  [Cooperative.isCooperative]: boolean;
  [Cooperative.Nif]: string;
}

export type ICooperative = ICooperativeData & { [Cooperative.Id]: string };
