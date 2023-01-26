import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  role: mongoose.Schema.Types.ObjectId;
  activities: mongoose.Schema.Types.ObjectId;
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
    required: [true, "Email not provided"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "{VALUE} is not a valid email!",
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  passwordResetToken: {
    type: String,
    trim: true,
  },
  passwordResetExpires: {
    type: Date,
    trim: true,
  },
  role: {
    type: mongoose.Schema.Types.String,
    ref: "Role",
    required: [true, "Please specify a user role for user"],
  },
  activities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
      default: [],
    },
  ],
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
