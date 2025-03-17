import { model, Schema, Types } from 'mongoose';

import { CulturaType, Entities, IsDeleted, owner } from '../constants';
import { ICulturaType } from '../types/cultura-type';

export const CulturaTypeSchema: Schema = new Schema(
  {
    [CulturaType.description]: {
      type: String,
      required: true,
      trim: true,
    },
    [owner]: { type: Types.ObjectId, ref: Entities.User, required: true },
    [IsDeleted]: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<ICulturaType>(Entities.CulturaType, CulturaTypeSchema);
