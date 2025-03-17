import { Partner } from '../../constants';
import partnerModel from '../../entities/partner.model';
import { IFetchParams } from '../../types';
import { partnerDTORepository } from '../../types/partner';
import {
  createPartnerRepository,
  getAllPartnerRepository,
  getPartnerByIdRepository,
} from '../contracts/partner';
import { getAllItens, getById } from './repository-helper';

export const getAlPartnerMongoRepository: getAllPartnerRepository = (fetchParams?: IFetchParams) =>
  getAllItens(partnerModel, fetchParams, undefined, undefined, false, Partner.User);

export const getPartnerMongoRepository: getPartnerByIdRepository = (id: string) =>
  getById(partnerModel, id, {}, false, Partner.User);

export const createPartnerMongoRepository: createPartnerRepository = (data: partnerDTORepository) =>
  partnerModel.create(data);
