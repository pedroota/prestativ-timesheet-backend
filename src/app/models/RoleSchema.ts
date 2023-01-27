import mongoose from "mongoose";
import { Permission } from "../enum/Permissions";

const Schema = mongoose.Schema;

interface IRole {
  name: string;
  permissions: string[];
}

const RoleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: {
    type: [String],
    enum: Object.values(Permission),
    required: true,
  },
});

const Role = mongoose.model<IRole>("Role", RoleSchema);

module.exports = Role;
