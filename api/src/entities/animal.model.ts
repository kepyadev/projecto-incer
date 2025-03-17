import { model, Schema } from 'mongoose';

import { Entities, IsDeleted, owner } from '../constants';
import Animal from '../constants/animal';
import { IAnimal } from '../types/animal';

export const animalSchema: Schema = new Schema(
  {
    [Animal.Type]: { type: Schema.Types.ObjectId, ref: Entities.AnimalType, required: true },
    [Animal.EffectiveTotal]: { type: Number, required: true },
    [Animal.Matrizes]: { type: Number, required: true },
    [Animal.YearOfProdution]: { type: Number, required: true, min: 2005, max: 2500 },
    [Animal.AnnualProdution]: { type: Number, required: true },
    [Animal.Fazenda]: { type: Schema.Types.ObjectId, ref: Entities.Fazenda, required: true },
    [Animal.Egg]: { type: Number },
    [IsDeleted]: { type: Boolean, default: false },
    [owner]: { type: Schema.Types.ObjectId, ref: Entities.User, required: true },
  },
  { timestamps: true }
);

export default model<IAnimal>(Entities.Animal, animalSchema);
