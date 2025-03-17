import { model, Schema } from 'mongoose';

import { Entities, IsDeleted, owner, province } from '../constants';
import { IProvince } from '../types/province';

export const ProvinceSchema: Schema = new Schema(
  {
    [province.Description]: {
      type: String,
      required: true,
      trim: true,
    },
    [province.Country]: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: Entities.Country,
    },
    [owner]: { type: Schema.Types.ObjectId, ref: Entities.User, required: true },
    [IsDeleted]: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<IProvince>(Entities.Province, ProvinceSchema);
