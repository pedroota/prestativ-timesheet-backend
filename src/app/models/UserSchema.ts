import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IUser {
  name: string;
  surname: string;
  email: string;
  password: string;
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
  // Adicionar o relacionamento entre a tabela de atividades e de ROLES
});

const User = mongoose.model<IUser>("User", UserSchema);

module.exports = User;
