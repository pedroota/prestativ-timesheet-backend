import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IRole {
  name: string;
}

const RoleSchema = new Schema<IRole>({
  name: {
    type: String,
    enum: ["Administrador", "Operação", "Gestor de Projetos", "Consultor"],
    default: "Consultor",
    required: true,
  },
});

const Role = mongoose.model<IRole>("Role", RoleSchema);

module.exports = Role;
