import { model, Schema, Types } from 'mongoose';

import { Cultura, Entities, IsDeleted, owner } from '../constants';
import { ICultura } from '../types/cultura';

export const CulturaSchema: Schema = new Schema(
  {
    [Cultura.type]: { type: Schema.Types.ObjectId, ref: Entities.CulturaType },
    [Cultura.irrigacao]: { type: String },
    [Cultura.agriculturalYear]: { type: String },
    [Cultura.quantity]: { type: Number, required: true },
    [Cultura.area]: { type: Number, required: true },
    [Cultura.dataSementeira]: { type: Date },
    [Cultura.dataColheita]: { type: Date },
    [Cultura.fazendaId]: { type: Schema.Types.ObjectId, ref: Entities.Fazenda, required: true },
    [Cultura.cooperative]: {
      type: Schema.Types.ObjectId,
      ref: Entities.Cooperative,
    },
    [owner]: { type: Types.ObjectId, ref: Entities.User, required: true },
    [IsDeleted]: { type: Boolean, default: false },
  },
  { timestamps: true }
).index({ [Cultura.type]: 1, createAt: -1, [Cultura.fazendaId]: 1 });

export default model<ICultura>(Entities.Cultura, CulturaSchema);
