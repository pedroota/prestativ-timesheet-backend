import mongoose from "mongoose";
// const Role = require('./RoleSchema');

const Schema = mongoose.Schema;

interface IUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  role: mongoose.Schema.Types.ObjectId;
  createdAt: number;
  updatedAt: number;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
  role: {
    type: mongoose.Schema.Types.String,
    ref: "Role",
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model<IUser>("User", UserSchema);

module.exports = User;
