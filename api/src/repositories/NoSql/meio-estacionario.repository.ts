import { FilterQuery } from 'mongoose';

import { IsDeleted } from '../../constants';
import { MeioEstacionario } from '../../constants/meio-estacionario';
import MeioEstacionarioModel from '../../entities/meio-estacionario.model';
import { IFetchParams } from '../../types';
import { IMeioEstacionario, MeioEstacionarioDTO } from '../../types/meio-estacionario';
import { deleteEntity, getAllItens } from './repository-helper';

// eslint-disable-next-line import/prefer-default-export
export const getAllMeioEstacionario = () => getAllItens(MeioEstacionarioModel);

export const getMeioEstacionarioByFazenda = (fazendaId: string, fetchParams: IFetchParams) =>
  getAllItens(
    MeioEstacionarioModel,
    fetchParams,
    { [MeioEstacionario.Fazenda]: fazendaId },
    {},
    false,
    {
      path: MeioEstacionario.Type,
    }
  );

export const getMeioEstacionarioById = (id: string) =>
  MeioEstacionarioModel.findById({ [IsDeleted]: { $ne: true }, [MeioEstacionario.Id]: id }).exec();

export const createMeioEstacionario = (data: MeioEstacionarioDTO) =>
  MeioEstacionarioModel.create(data);

export const deleteMeioEstacionario = (id: string) =>
  deleteEntity<IMeioEstacionario>(MeioEstacionarioModel, {
    [MeioEstacionario.Id]: id,
  } as FilterQuery<IMeioEstacionario>);
