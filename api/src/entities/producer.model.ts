import { model, Schema, Types } from 'mongoose';

import { Entities, IsDeleted, owner } from '../constants';
import { Producer } from '../constants/producer';
import { IProducer } from '../types/producer';

const ProducerSchema: Schema = new Schema(
  {
    [Producer.nif]: {
      type: String,
      required: true,
    },
    [Producer.shortCode]: {
      type: String,
      required: true,
      unique: true,
      default() {
        return new Types.ObjectId().toHexString().slice(0, 10);
      },
    },
    [Producer.companyName]: {
      type: String,
      required: false,
    },
    [Producer.isProducer]: {
      type: String,
      required: false,
    },
    [Producer.userId]: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: Entities.User,
    },
    [Producer.cooperativeId]: {
      type: Schema.Types.ObjectId,
      ref: Entities.Cooperative,
      default: null,
      unique: true,
    },
    [owner]: { type: Schema.Types.ObjectId, ref: Entities.User, required: true },
    [IsDeleted]: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<IProducer>(Entities.Producer, ProducerSchema);
