import { model, Schema } from 'mongoose';

import { Entities, IsDeleted, owner, Partner } from '../constants';
import { IPartner } from '../types/partner';

const PartnerSchema: Schema = new Schema(
  {
    [Partner.Ministerio]: {
      type: String,
      required: true,
    },

    [Partner.User]: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: Entities.User,
    },

    [owner]: { type: Schema.Types.ObjectId, ref: Entities.User, required: true },
    [IsDeleted]: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<IPartner>(Entities.Partner, PartnerSchema);
