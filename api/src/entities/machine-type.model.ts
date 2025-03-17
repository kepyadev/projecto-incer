import { model, Schema } from 'mongoose';

import { Entities, IsDeleted, owner } from '../constants';
import { MachineType } from '../constants/machine';
import { IMachineType } from '../types/machine-type.type';

export const MachineTypeSchema: Schema = new Schema({
  [MachineType.Description]: { type: String, required: true },
  [owner]: { type: Schema.Types.ObjectId, ref: Entities.User, required: true },
  [IsDeleted]: { type: Boolean, default: false },
});

export default model<IMachineType>(Entities.MachineType, MachineTypeSchema);
