import { model, Schema } from 'mongoose';

export interface ILogs {
  emailphone: string;
  data: string;
  status: string;
  operation: string;
}

export const LogsSchema: Schema = new Schema(
  {
    emailphone: {
      type: String,
      required: true,
    },
    data: {
      type: Schema.Types.Date,
    },
    status: {
      type: String,
    },
    operation: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<ILogs>('logs', LogsSchema);
