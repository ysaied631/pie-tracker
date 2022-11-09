import { Document, model, Schema, Model, Types, models } from 'mongoose';

export interface UserInterface extends Document {
  _id: Types.ObjectId;
  email: string;
  username: string;
  passwordHash: string;
  accessFailedCount: number;
  lockoutEnabled: boolean;
  lockoutExpires: string;
  activated: boolean;
  createdAt: Date;
  roles: Array<string>;
};

const UsersSchema = new Schema<UserInterface>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  accessFailedCount: {
    type: Number,
    default: 0,
  },
  lockoutEnabled: {
    type: Boolean
  },
  lockoutExpires: {
    type: String
  },
  activated: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
  },
  roles: [{ name: String }],
});

const Users: Model<UserInterface> = models?.users || model('users', UsersSchema);
export default Users;