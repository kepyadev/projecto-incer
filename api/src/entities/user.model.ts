import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';

import { Entities, User, UserRole } from '../constants';
import { IUser } from '../types/user';

export const UserSchema: Schema = new Schema(
  {
    [User.firstName]: {
      type: String,
      required: true,
      trim: true,
    },

    [User.lastName]: {
      type: String,
      required: true,
      trim: true,
    },
    [User.status]: {
      type: Boolean,
      required: true,
      default: true,
    },

    [User.phoneNumber]: {
      type: String,
      trim: true,
      unique: true,
      index: true,
    },

    [User.email]: {
      type: String,
      sparse: true,
      trim: true,
      unique: true,
      index: true,
    },

    [User.password]: {
      type: String,
    },

    [User.emailCode]: {
      type: String,
    },

    [User.mobileCode]: {
      type: String,
    },

    [User.lastLoginDate]: {
      type: Date,
    },

    [User.role]: {
      type: UserRole,
      required: true,
    },

    [User.permitions]: {
      type: [String],
      default: [],
    },
    [User.county]: {
      type: Schema.Types.ObjectId,
      ref: Entities.County,
    },
    [User.imageUrl]: {
      type: [String],
      default: [],
    },

    [User.token]: {
      type: String,
    },
  },
  { timestamps: true }
);

// eslint-disable-next-line func-names
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  return next();
});

export default model<IUser>(Entities.User, UserSchema);
