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
      unique: true, // Isso já cria um índice único.
      sparse: true, // Garante que o índice não seja aplicado em documentos sem o campo.
    },
    [owner]: { type: Schema.Types.ObjectId, ref: Entities.User, required: true },
    [IsDeleted]: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Adicionando o índice programaticamente, o que é útil para índices mais complexos.
// No seu caso, 'unique: true' e 'sparse: true' no próprio campo já fazem o trabalho.
// Mas para fins de demonstração, aqui está como você faria:
ProducerSchema.index({ [Producer.cooperativeId]: 1 }, { unique: true, sparse: true });

export default model<IProducer>(Entities.Producer, ProducerSchema);