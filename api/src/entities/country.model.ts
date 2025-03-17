import { model, Schema, Types } from 'mongoose';

import { Entities, IsDeleted, owner, province } from '../constants';
import { ICountry } from '../types/country';

export const CountrySchema: Schema = new Schema(
  {
    [province.Description]: {
      type: String,
      required: true,
      trim: true,
    },
    [IsDeleted]: { type: Boolean, default: false },
    [owner]: { type: Types.ObjectId, ref: Entities.User, required: true },
  },
  { timestamps: true }
);

export default model<ICountry>(Entities.Country, CountrySchema);
