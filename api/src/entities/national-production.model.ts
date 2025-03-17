import { model, Schema } from 'mongoose';

import { Entities, IsDeleted, NationalProductionType } from '../constants';
import { NationalProductionDTO } from '../types/national-production';

const NationalProductionSchema = new Schema({
  [NationalProductionType.Product]: {
    type: String,
    required: true,
  },
  [NationalProductionType.Year]: {
    type: Number,
    required: true,
  },
  [NationalProductionType.QuantityProduced]: {
    type: Number,
    required: true,
  },
  [NationalProductionType.AveragePrice]: {
    type: Number,
    required: true,
  },
  [NationalProductionType.Region]: {
    type: String,
    required: true,
  },
  [IsDeleted]: { type: Boolean, default: false },
});

export default model<NationalProductionDTO>(Entities.NationalProduction, NationalProductionSchema);
