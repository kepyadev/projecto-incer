import { owner, Partner, User } from '../constants';
import {
  createPartnerRepository,
  getAllPartnerRepository,
  getPartnerByIdRepository,
} from '../repositories/contracts/partner';
import { createUserRepository } from '../repositories/contracts/user';
import { IFetchParams } from '../types';
import { PartnerDTO } from '../types/partner';

export const getAllPartnerService = (
  repository: getAllPartnerRepository,
  fetchParams?: IFetchParams
) => repository(fetchParams);

export const getPartnerByIdService = (id: string, repository: getPartnerByIdRepository) =>
  repository(id);

export const createPartnerService = async (
  data: PartnerDTO,
  repository: createPartnerRepository,
  userReository: createUserRepository
) => {
  // console.log('USER');
  // console.log(data);

  const user = await userReository(data[Partner.User]);

  return repository({
    [Partner.Ministerio]: data[Partner.Ministerio],
    [Partner.User]: user[User.id],
    [owner]: data[owner],
  });
};
