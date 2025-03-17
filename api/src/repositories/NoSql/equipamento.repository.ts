import { Equipamento } from '../../constants/equipamento';
import equipamentoModel from '../../entities/equipamento.model';
import { IFetchParams } from '../../types';
import { EquipamentoDTO } from '../../types/equipamento';
import { getAllItens } from './repository-helper';

export const getAllEquipamentos = () => equipamentoModel.find().populate(Equipamento.Type).exec();

export const getEquipamentosByFazenda = (fazendaId: string, fetchParams: IFetchParams) =>
  getAllItens(equipamentoModel, fetchParams, { [Equipamento.Fazenda]: fazendaId }, {}, false, {
    path: Equipamento.Type,
  });

export const getEquipamentoById = (id: string) =>
  equipamentoModel.findById(id).populate(Equipamento.Type);

export const createEquipamento = (equipamento: EquipamentoDTO) =>
  equipamentoModel.create(equipamento);
