import { HumanResource } from '../../constants/human-resource';
import humanResourceModel from '../../entities/human-resource.model';
import { IFetchParams } from '../../types';
import { HumanResourceDTO } from '../../types/human-resource';
import { getAllItens } from './repository-helper';

export const getAllHumanResource = () => getAllItens(humanResourceModel);

export const getAllHumanResourceByFazenda = (fazendaId: string, fetchParams?: IFetchParams) =>
  getAllItens(humanResourceModel, fetchParams, { [HumanResource.Fazenda]: fazendaId }, {}, false, {
    path: HumanResource.Type,
  });

export const createHumanResource = (cultura: HumanResourceDTO) =>
  humanResourceModel.create(cultura);
