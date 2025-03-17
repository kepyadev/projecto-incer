import { model, Schema, Types } from 'mongoose';

import { Entities, IsDeleted, owner } from '../constants';
import { InfrastructureType } from '../constants/infrastructure-type';
import { IInfrastructureType } from '../types/infrastructure-type';

export const InfrastructureTypeSchema: Schema = new Schema({
  [InfrastructureType.Description]: { type: String, required: true, trim: true },
  [owner]: { type: Types.ObjectId, ref: Entities.User, required: true },
  [IsDeleted]: { type: Boolean, default: false },
});

export default model<IInfrastructureType>(Entities.InfrastructureType, InfrastructureTypeSchema);
