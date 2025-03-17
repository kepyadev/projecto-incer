import { Types } from 'mongoose';

import { Machine } from '../../constants/machine';
import machineModel from '../../entities/machine.model';
import { IFetchParams } from '../../types';
import { IMachine, MachineDTO } from '../../types/machine.type';
import { getAllItens } from './repository-helper';

export const getAllMachines = () => machineModel.find();

export const getMachinesByFazenda = (fazendaId: string, fetchParams: IFetchParams) =>
  getAllItens(machineModel, fetchParams, { [Machine.fazenda]: fazendaId }, {}, false, {
    path: Machine.Type,
  });

export const createMachine = (machine: MachineDTO) => machineModel.create(machine);

export const getAllMachinesByProducer = (producerId: string) =>
  machineModel.aggregate<IMachine>([
    {
      $lookup: {
        from: 'fazendas',
        localField: 'fazenda',
        foreignField: '_id',
        as: 'fazenda',
      },
    },
    {
      $unwind: {
        path: '$fazenda',
      },
    },
    {
      $lookup: {
        from: 'producers',
        localField: 'fazenda.producer_id',
        foreignField: '_id',
        as: 'fazenda.producer_id',
      },
    },
    {
      $unwind: {
        path: '$fazenda.producer_id',
      },
    },
    {
      $match: {
        'fazenda.producer_id._id': new Types.ObjectId(producerId),
      },
    },
  ]);
