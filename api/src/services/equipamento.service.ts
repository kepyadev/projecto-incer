import {
  createEquipamento,
  getAllEquipamentos,
  getEquipamentoById,
  getEquipamentosByFazenda,
} from '../repositories/NoSql/equipamento.repository';
import { IFetchParams } from '../types';
import { EquipamentoDTO } from '../types/equipamento';

export const getAllEquipamentosService = () => getAllEquipamentos();

export const getEquipamentosByFazendaService = (fazendaId: string, fetchParams: IFetchParams) =>
  getEquipamentosByFazenda(fazendaId, fetchParams);

export const getEquipamentoByIdService = (id: string) => getEquipamentoById(id);

export const createEquipamentoService = (equipamento: EquipamentoDTO) =>
  createEquipamento(equipamento);
