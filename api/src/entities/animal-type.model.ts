import { model, Schema, Types } from 'mongoose';

import { Entities, IsDeleted, owner } from '../constants';
import { AnimalType } from '../constants/animal-type';
import { IAnimalType } from '../types/animal-type';

export const AnimalTypeSchema: Schema = new Schema({
  [AnimalType.Description]: { type: String, required: true, trim: true },
  [AnimalType.IsAve]: { type: Boolean, default: false },
  [owner]: { type: Types.ObjectId, ref: Entities.User, required: true },
  [IsDeleted]: { type: Boolean, default: false },
});

export default model<IAnimalType>(Entities.AnimalType, AnimalTypeSchema);
