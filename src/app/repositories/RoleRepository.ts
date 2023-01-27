const Role = require("../models/RoleSchema");

class RoleRepository {
  async findAll() {
    const roles = await Role.find();

    return roles;
  }

  async findByName(name: string) {
    const role = await Role.findOne({ name: name });

    return role;
  }

  async findById(id: string) {
    const role = await Role.findOne({ _id: id });

    return role;
  }

  async findByIdAndUpdate(id: string, { name, permissions }) {
    const role = await Role.findOneAndUpdate(
      { _id: id },
      { name: name, permissions: permissions }
    );

    return role;
  }

  async create({ name, permissions }) {
    const role = new Role({
      name,
      permissions,
    });

    await role.save();

    return role;
  }

  async delete(id: string) {
    await Role.findOneAndDelete({ _id: id });
    return;
  }
}

module.exports = new RoleRepository();
