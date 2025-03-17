import { IFetchParams } from '../../types';
import { IPartner, partnerDTORepository } from '../../types/partner';
import { ListResponse } from '../NoSql/repository-helper';

export type getAllPartnerRepository = (
  fetchParams?: IFetchParams
) => Promise<ListResponse<IPartner>>;
export type getPartnerByIdRepository = (id: string) => Promise<IPartner | null>;
export type createPartnerRepository = (data: partnerDTORepository) => Promise<IPartner>;
