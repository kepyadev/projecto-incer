import { Infrastructure } from '../../constants/infrastructure';
import infrastructureModel from '../../entities/infrastructure.model';
import { IFetchParams } from '../../types';
import { InfrastructureDTO } from '../../types/infrastructure';
import { getAllItens } from './repository-helper';

// eslint-disable-next-line import/prefer-default-export
export const getAllInfrastructure = () =>
  infrastructureModel.find().populate(Infrastructure.Type).exec();

export const getInfrastructureByFazenda = (fazendaId: string, fetchParams: IFetchParams) =>
  getAllItens(
    infrastructureModel,
    fetchParams,
    {
      [Infrastructure.Fazenda]: fazendaId,
    },
    {},
    false,
    { path: Infrastructure.Type }
  );

export const getInfrastrutureById = (id: string) =>
  infrastructureModel.findById(id).populate(Infrastructure.Type).exec();

export const createInfrastruture = (infrastruture: InfrastructureDTO) =>
  infrastructureModel.create(infrastruture);
