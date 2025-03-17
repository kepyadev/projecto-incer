import { model, Schema } from 'mongoose';

import { Cooperative, Entities, IsDeleted, owner } from '../constants';
import { ICooperative } from '../types/cooperative';
import { contactSchema } from './sub-entiteis';

export const cooperativeSchema: Schema = new Schema(
  {
    [Cooperative.name]: { type: String, required: true },
    [Cooperative.president]: { type: String, required: true },
    [Cooperative.nif]: { type: String, required: true },
    [Cooperative.contact]: { type: contactSchema, required: true },
    [Cooperative.desvinculados]: { type: [Schema.Types.ObjectId], ref: Entities.Producer },
    [Cooperative.userId]: { type: Schema.Types.ObjectId, ref: Entities.User, required: true },
    [Cooperative.county]: { type: Schema.Types.ObjectId, ref: Entities.County, required: true },
    [Cooperative.isCooperative]: { type: Boolean, required: true },
    [IsDeleted]: { type: Boolean, default: false },
    [owner]: { type: Schema.Types.ObjectId, ref: Entities.User },
  },
  { timestamps: true }
);

export default model<ICooperative>(Entities.Cooperative, cooperativeSchema);
