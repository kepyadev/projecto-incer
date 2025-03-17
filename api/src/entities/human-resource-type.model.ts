import { model, Schema, Types } from 'mongoose';

import { Entities, IsDeleted, owner } from '../constants';
import { HumanResourceType } from '../constants/human-resource-type';
import { IHumanResourceType } from '../types/human-resource-type';

export const HumanResourceTypeSchema: Schema = new Schema({
  [HumanResourceType.Description]: { type: String, required: true, trim: true },
  [owner]: { type: Types.ObjectId, ref: Entities.User, required: true },
  [IsDeleted]: { type: Boolean, default: false },
});

export default model<IHumanResourceType>(Entities.HumanResourceType, HumanResourceTypeSchema);
