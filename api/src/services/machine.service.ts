import {
  createMachine,
  getAllMachines,
  getMachinesByFazenda,
} from '../repositories/NoSql/machine.repository';
import { IFetchParams } from '../types';
import { MachineDTO } from '../types/machine.type';

export const getAllMachinesService = () => getAllMachines();
export const getMachinesByFazendaService = (fazendaId: string, fetchParams: IFetchParams) =>
  getMachinesByFazenda(fazendaId, fetchParams);

export const createMachineService = (machine: MachineDTO) => createMachine(machine);
