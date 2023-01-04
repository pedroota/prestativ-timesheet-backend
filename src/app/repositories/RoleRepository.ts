const Role = require("../models/RoleSchema");

class RoleRepository {
  async findAll() {
    const roles = await Role.find();

    return roles;
  }

  async findByName(name: string) {
    const role = Role.findOne({ name: name });

    return role;
  }

  async create({ name }) {
    const role = new Role({
      name,
    });

    await role.save();

    return role;
  }
}

module.exports = new RoleRepository();
