import { model, Schema, Types } from 'mongoose';

import { Entities, IsDeleted, owner } from '../constants';
import { MeioEstacionario } from '../constants/meio-estacionario';
import { IMeioEstacionario } from '../types/meio-estacionario';

export const MeioEstacionarioSchema: Schema = new Schema(
  {
    [MeioEstacionario.Type]: {
      type: Types.ObjectId,
      required: true,
      ref: Entities.MeioEstacionarioType,
    },
    [MeioEstacionario.Quantity]: { type: Number, required: true },
    [MeioEstacionario.PowerValue]: {
      value: { type: String, required: true }, // Subdocumento: campo "value"
      unity: { type: String, required: true }, // Subdocumento: campo "unity"
    },
    [owner]: { type: Schema.Types.ObjectId, ref: Entities.User, required: true },
    [IsDeleted]: { type: Boolean, default: false },
    [MeioEstacionario.Fazenda]: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: Entities.Fazenda,
    },
  },
  { timestamps: true }
);

export default model<IMeioEstacionario>(Entities.MeioEstacionario, MeioEstacionarioSchema);
