import { model, Schema, Types } from 'mongoose';

import { Entities, IsDeleted, owner } from '../constants';
import { Equipamento } from '../constants/equipamento';
import { IEquipamento } from '../types/equipamento';

export const EquipamentoSchema: Schema = new Schema(
  {
    [Equipamento.Type]: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: Entities.EquipamentoType,
    },
    [Equipamento.Quantity]: { type: Number, required: true },
    [Equipamento.Caracteristic]: { type: String, default: '' },
    [Equipamento.Fazenda]: { type: Schema.Types.ObjectId, ref: Entities.Fazenda, required: true },
    [IsDeleted]: { type: Boolean, default: false },
    [owner]: { type: Types.ObjectId, ref: Entities.User, required: true },
  },
  { timestamps: true }
);

export default model<IEquipamento>(Entities.Equipamentos, EquipamentoSchema);
