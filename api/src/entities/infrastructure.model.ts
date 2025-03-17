import { model, Schema, Types } from 'mongoose';

import { Entities, IsDeleted, owner } from '../constants';
import { Infrastructure } from '../constants/infrastructure';
import { IInfrastructure } from '../types/infrastructure';

export const InfrastructureSchema: Schema = new Schema(
  {
    [Infrastructure.Type]: { type: Schema.Types.ObjectId, ref: Entities.InfrastructureType },
    [Infrastructure.Quantity]: { type: Number, required: true },
    [Infrastructure.Capacidade]: { type: String, required: true },
    [Infrastructure.Unidade]: { type: String, required: true },
    [Infrastructure.Fazenda]: { type: Schema.Types.ObjectId, ref: Entities.Fazenda },
    [owner]: { type: Types.ObjectId, ref: Entities.User, required: true },
    [IsDeleted]: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<IInfrastructure>(Entities.Infrastructure, InfrastructureSchema);
