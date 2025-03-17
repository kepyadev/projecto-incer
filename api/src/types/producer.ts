import { owner, Producer } from '../constants';
import { IUser } from './user';

export interface IProducer {
  [Producer.id]: string;
  [Producer.bi]: string;
  [Producer.nif]: string;
  [Producer.county]: string;
  [Producer.companyName]: string;
  [Producer.shortCode]: string;
  [Producer.cooperativeId]?: string;
  [Producer.isProducer]: string;
  [Producer.userId]: IUser;
  [Producer.CreatedAt]: Date;
  [Producer.UpdatedAt]: Date;
}
export interface ProducerDTO {
  [Producer.bi]?: string;
  [Producer.nif]: string;
  [Producer.companyName]: string;
  [Producer.shortCode]: string;
  [Producer.county]?: string;
  [Producer.cooperativeId]?: string;
  [Producer.isProducer]: string;
  [Producer.userId]: string;
  [owner]: string;
}

export const ProducerRequiredFields = [Producer.nif, Producer.county];

export const ProducerAcceptableFields = [
  Producer.nif,
  Producer.county,
  Producer.userId,
  Producer.companyName,
  Producer.shortCode,
  Producer.isProducer,
  Producer.cooperativeId,
];
