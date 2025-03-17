import { Producer } from '../constants/entities';
import { User } from '../constants/user';
import { ICooperative } from './cooperative';
import { IFazenda } from './fazenda';
import { ICounty } from './index';
import { IUser, UserRole } from './user';

export interface IProducer {
  [Producer.Id]: string;
  [Producer.Nif]: string;
  [Producer.CompanyName]: string;
  [Producer.isProducer]: string;
  [Producer.Bi]: string;
  [Producer.User]: IUser;
  [Producer.Fazendas]?: IFazenda[];
  [Producer.Cooperative]?: ICooperative;
  [Producer.County]: ICounty;
}

export interface ProducerDTO {
  [Producer.Nif]: string;
  [Producer.County]: string;
  [Producer.Cooperative]: string;
  [Producer.CompanyName]: string;
  [Producer.isProducer]: string;
  [Producer.User]: {
    [User.FirstName]: string;
    [User.LastName]: string;
    [User.County]?: string;
    [User.Email]?: string;
    [User.Phone]: number;
    [User.Role]: UserRole;
    [User.Password]?: string;
    [User.Photo]?: string;
  };
}
