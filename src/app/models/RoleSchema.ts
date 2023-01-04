import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IRole {
  name: string;
}

const RoleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
  },
});

const Role = mongoose.model<IRole>("Role", RoleSchema);

module.exports = Role;
