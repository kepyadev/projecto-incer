import { FilterQuery, Types } from 'mongoose';

import { IsDeleted } from '../../constants';
import { MachineType } from '../../constants/machine';
import machineTypeModel from '../../entities/machine-type.model';
import { IMachine } from '../../types/machine.type';
import { IMachineType, MachineTypeDTO } from '../../types/machine-type.type';
import { createMany, deleteEntity, getAllItens, updateGeneric } from './repository-helper';

export const getAllMachineTypes = () => getAllItens(machineTypeModel);

export const getMachineTypeById = (id: string) =>
  machineTypeModel
    .findOne(
      {
        [IsDeleted]: { $ne: true },
        [MachineType.Id]: new Types.ObjectId(id),
      } as FilterQuery<IMachine>,
      { [IsDeleted]: false }
    )
    .exec();

export const createMachineType = (data: MachineTypeDTO) => machineTypeModel.create(data);

export const createManyMachineType = (data: MachineTypeDTO[]) => createMany(machineTypeModel, data);

export const deleteMachineType = (id: string) =>
  deleteEntity<IMachineType>(machineTypeModel, {
    [MachineType.Id]: id,
  } as FilterQuery<IMachineType>);

export const updateMachineType = (id: string, data: MachineTypeDTO) =>
  updateGeneric(machineTypeModel, id, data);
