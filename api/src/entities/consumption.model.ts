import { model, Schema } from 'mongoose';

import { Entities, ImportedProductsTypes, IsDeleted } from '../constants';
import { ImportedProductsDTO } from '../types/consumption';

const ConsumptionSchema = new Schema({
  [ImportedProductsTypes.Product]: {
    type: String,
    required: true,
  },
  [ImportedProductsTypes.Year]: {
    type: Number,
    required: true,
  },
  [ImportedProductsTypes.OriginCountry]: {
    type: String,
    required: true,
  },
  [ImportedProductsTypes.QuantityImported]: {
    type: Number,
    required: true,
  },
  [ImportedProductsTypes.MarketPrice]: {
    type: Number,
    required: true,
  },
  [IsDeleted]: { type: Boolean, default: false },
});

export default model<ImportedProductsDTO>(Entities.Consumption, ConsumptionSchema);
