import { model, Schema } from 'mongoose';

import { Entities, IsDeleted, NationalMarketPricesTypes } from '../constants';
import { NationalMarketPricesDTO } from '../types/market-prices';

const MarketPriceSchema = new Schema({
  [NationalMarketPricesTypes.Product]: {
    type: String,
    required: true,
  },
  [NationalMarketPricesTypes.Year]: {
    type: Number,
    required: true,
  },
  [NationalMarketPricesTypes.AveragePrice]: {
    type: Number,
    required: true,
  },
  [NationalMarketPricesTypes.Region]: {
    type: String,
    required: true,
  },
  [IsDeleted]: { type: Boolean, default: false },
});

// Criando índice para melhorar consultas por ano e produto
MarketPriceSchema.index({ ano: 1, produto: 1 });

export default model<NationalMarketPricesDTO>(Entities.MarketPrice, MarketPriceSchema);
