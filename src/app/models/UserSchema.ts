import mongoose from "mongoose";
// const Role = require('./RoleSchema');

const Schema = mongoose.Schema;

interface IUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: mongoose.Schema.Types.ObjectId; // qual é o tipo adequado???????????????????????
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
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roles",
    required: true,
  },
});

const User = mongoose.model<IUser>("User", UserSchema);

module.exports = User;
