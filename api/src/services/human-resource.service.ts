import {
  createHumanResource,
  getAllHumanResourceByFazenda,
} from '../repositories/NoSql/human-resource';
import { IFetchParams } from '../types';
import { HumanResourceDTO } from '../types/human-resource';

// eslint-disable-next-line import/prefer-default-export
export const createHumanResourceService = (humanResource: HumanResourceDTO) =>
  createHumanResource(humanResource);

export const getAllHumanResourceByFazendaService = (
  fazendaId: string,
  fetchParams?: IFetchParams
) => getAllHumanResourceByFazenda(fazendaId, fetchParams);
