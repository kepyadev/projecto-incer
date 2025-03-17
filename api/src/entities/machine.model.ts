import { model, Schema } from 'mongoose';

import { Entities, IsDeleted, owner } from '../constants';
import { Machine } from '../constants/machine';
import { IMachine } from '../types/machine.type';
import { powerSchema } from './sub-entiteis';

export const MachineSchema: Schema = new Schema(
  {
    [Machine.Power]: { type: powerSchema, required: true },
    [Machine.Quantity]: { type: Number, required: true },
    [Machine.Type]: { type: Schema.Types.ObjectId, ref: Entities.MachineType, required: true },
    [Machine.fazenda]: { type: Schema.Types.ObjectId, required: true, ref: Entities.Fazenda },
    [owner]: { type: Schema.Types.ObjectId, ref: Entities.User, required: true },
    [IsDeleted]: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<IMachine>(Entities.Machine, MachineSchema);
