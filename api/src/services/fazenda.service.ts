import {
  addAnimal,
  addCultura,
  addEquipamento,
  addHumanResource,
  addInfrastruture,
  addMachine,
  addMeioEstacionario,
  createFazenda,
  deleteFazendaRepository,
  fazendaGrown,
  findAllFazenda,
  findAllFazendaByCooperative,
  findAllFazendaByProducer,
  findFazendaByEmail,
  findFazendaById,
  findFazendaByNif,
  findFazendaByPhone,
  updateFazendaByProducer,
} from '../repositories/NoSql/fazenda.repository';
import { IFetchParams } from '../types';
import { IFazenda, IFazendaData } from '../types/fazenda';

export const getAllFazendaService = (fetchParams?: IFetchParams, filter?: Record<string, any>) =>
  findAllFazenda(fetchParams, filter);

export const getAllFazendaByProducerService = (
  producerId: string,
  paginationParams?: IFetchParams
) => findAllFazendaByProducer(producerId, paginationParams);

export const getFazendaByIdService = (id: string) => findFazendaById(id);

export const getAllFazendaByCooperativeByUserIdService = (userId: string) =>
  findAllFazendaByCooperative(userId);

export const createFazendaService = (fazenda: IFazendaData) => createFazenda(fazenda);

export const deleteFazendaService = (id: string) => deleteFazendaRepository(id);

export const updateFazendaByProducerService = (id: string, fazenda: IFazenda) =>
  updateFazendaByProducer(id, fazenda);

export const addCulturaService = (culturaId: string, fazendaId: string) =>
  addCultura(culturaId, fazendaId);

export const addMachineService = (fazendaId: string, machineId: string) =>
  addMachine(fazendaId, machineId);

export const addEquipamentoService = (fazendaId: string, equipamentoId: string) =>
  addEquipamento(fazendaId, equipamentoId);

export const addMeioEstacionarioService = (fazendaId: string, meioId: string) =>
  addMeioEstacionario(fazendaId, meioId);

export const addInfrastrutureService = (fazendaId: string, infrastruture: string) =>
  addInfrastruture(fazendaId, infrastruture);

export const addAnimalService = (fazendaId: string, animalId: string) =>
  addAnimal(fazendaId, animalId);

export const addHumanResourceService = (fazendaId: string, animalId: string) =>
  addHumanResource(fazendaId, animalId);

export const fazendaGrownService = () => fazendaGrown();

export const findFazendaByNifService = (nif: string) => findFazendaByNif(nif);
export const findFazendaByPhoneService = (phone_number: string) => findFazendaByPhone(phone_number);
export const findFazendaByEmailService = (email: string) => findFazendaByEmail(email);
