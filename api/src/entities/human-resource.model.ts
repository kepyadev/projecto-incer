import { model, Schema } from 'mongoose';

import { Entities, IsDeleted, owner } from '../constants';
import { HumanResource } from '../constants/human-resource';
import { IHumanResource } from '../types/human-resource';

export const HumanResourceSchema: Schema = new Schema(
  {
    [HumanResource.Type]: {
      type: Schema.Types.ObjectId,
      ref: Entities.HumanResourceType,
      required: true,
    },
    [HumanResource.Quantity]: { type: String, required: true, trim: true },
    [HumanResource.Fazenda]: { type: Schema.Types.ObjectId, ref: Entities.Fazenda, required: true },
    [owner]: { type: Schema.Types.ObjectId, ref: Entities.User, required: true },
    [IsDeleted]: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<IHumanResource>(Entities.HumanResource, HumanResourceSchema);
