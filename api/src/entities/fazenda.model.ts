import { model, Schema } from 'mongoose';

import { Entities, IsDeleted, owner } from '../constants';
import { Fazenda } from '../constants/fazenda';
import { IFazenda } from '../types/fazenda';
import { contactSchema, GeoSchema, GroundSchema } from './sub-entiteis';

export const FazendaSchema: Schema = new Schema(
  {
    [Fazenda.Descricao]: {
      type: String,
      required: true,
      trim: true,
    },
    [Fazenda.Contact]: { type: contactSchema },
    [Fazenda.Gerencia]: { type: String },
    [Fazenda.County]: { type: Schema.Types.ObjectId, ref: Entities.County, required: true },
    [Fazenda.Estradanacional]: { type: String },
    [Fazenda.DistanciaEstrada]: { type: Number },
    [Fazenda.Ground]: { type: GroundSchema },
    [Fazenda.Nif]: { type: String },
    [Fazenda.ProducerId]: { type: Schema.Types.ObjectId, ref: Entities.Producer, required: true },
    [Fazenda.Geo]: { type: GeoSchema, required: true },
    [Fazenda.Cultura]: { type: [Schema.Types.ObjectId], ref: Entities.Cultura, default: [] },
    [Fazenda.Machines]: { type: [Schema.Types.ObjectId], ref: Entities.Machine },
    [Fazenda.Equipamentos]: { type: [Schema.Types.ObjectId], ref: Entities.Equipamentos },
    [Fazenda.MeioEstacionario]: {
      type: [Schema.Types.ObjectId],
      ref: Entities.MeioEstacionario,
      default: [],
    },
    [Fazenda.Infrastructure]: { type: [Schema.Types.ObjectId], ref: Entities.Infrastructure },
    [Fazenda.Animals]: { type: [Schema.Types.ObjectId], ref: Entities.Animal },
    [Fazenda.HumanResource]: { type: [Schema.Types.ObjectId], ref: Entities.HumanResource },
    [Fazenda.Extension]: { type: Number, required: true, min: 50 },
    [IsDeleted]: { type: Boolean, default: false },
    [owner]: { type: Schema.Types.ObjectId, ref: Entities.User, required: true },
  },
  { timestamps: true }
);

export default model<IFazenda>(Entities.Fazenda, FazendaSchema);
