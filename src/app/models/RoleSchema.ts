import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IRole {
  name: string;
}

const RoleSchema = new Schema<IRole>({
  name: {
    type: String,
    enum: ["Administrador", "Operacional", "Gerente de Projetos", "Consultor"],
    required: true,
    unique: true,
  },
});

const Role = mongoose.model<IRole>("Role", RoleSchema);

module.exports = Role;
