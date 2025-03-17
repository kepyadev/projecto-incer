import { model, Schema, Types } from 'mongoose';

import { County, Entities, IsDeleted, owner } from '../constants';
import { ICounty } from '../types/County';

export const CountySchema: Schema = new Schema(
  {
    [County.Description]: {
      type: String,
      required: true,
      trim: true,
    },
    [County.ProvinceId]: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: Entities.Province,
    },
    [owner]: { type: Types.ObjectId, ref: Entities.User, required: true },
    [IsDeleted]: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<ICounty>(Entities.County, CountySchema);
