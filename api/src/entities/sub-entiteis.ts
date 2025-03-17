import { Schema } from 'mongoose';

import { ContactInformation, Geo, Ground } from '../constants';
import { Power } from '../constants/power';
import { PowerUnity } from '../types/power';

// eslint-disable-next-line import/prefer-default-export
export const powerSchema = new Schema(
  {
    [Power.Unity]: { type: String, enum: Object.values(PowerUnity), required: true },
    [Power.Value]: { type: Number, required: true },
  },
  { _id: false }
);

export const contactSchema = new Schema(
  {
    [ContactInformation.Email]: { type: String, lowercase: true, trim: true },
    [ContactInformation.Phone]: { type: String, trim: true },
  },
  { _id: false }
);

export const GroundSchema = new Schema(
  {
    [Ground.AltitudeMedia]: { type: Number },
    [Ground.AreaCorrigida]: { type: Number },
    [Ground.Orografia]: { type: String },
    [Ground.PhMedio]: { type: Number },
    [Ground.PropriedadesFisicas]: { type: String },
    [Ground.SomaBases]: { type: Number },
    [Ground.ctc]: { type: Number },
    [Ground.indiceAluminio]: { type: Number },
    [Ground.indiceSodio]: { type: Number },
    [Ground.dataAnalise]: { type: Date },
  },
  { _id: false }
);

export const GeoSchema = new Schema({
  [Geo.Latitude]: { type: Number, required: true },
  [Geo.Longitude]: { type: Number, required: true },
});
