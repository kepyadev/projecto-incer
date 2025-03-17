import { model, Schema, Types } from 'mongoose';

import { Entities, IsDeleted, owner } from '../constants';
import { EquipamentoType } from '../constants/equipamento-type';
import { IEquipamentoType } from '../types/equipamento-type';

export const EquipamentoTypeSchema: Schema = new Schema({
  [EquipamentoType.Description]: { type: String, required: true, trim: true },
  [owner]: { type: Types.ObjectId, ref: Entities.User, required: true },
  [IsDeleted]: { type: Boolean, default: false },
});

export default model<IEquipamentoType>(Entities.EquipamentoType, EquipamentoTypeSchema);
