import { model, Schema } from 'mongoose';

import { Entities, IsDeleted, owner } from '../constants';
import { MeioEstacionarioType } from '../constants/meio-estacionario-type';
import { IMeioEstacionarioType } from '../types/meio-estacionario-type';

export const MeioEstacionarioTypeSchema: Schema = new Schema({
  [MeioEstacionarioType.Description]: { type: String, required: true },
  [owner]: { type: Schema.Types.ObjectId, ref: Entities.User, required: true },
  [IsDeleted]: { type: Boolean, default: false },
});

export default model<IMeioEstacionarioType>(
  Entities.MeioEstacionarioType,
  MeioEstacionarioTypeSchema
);
