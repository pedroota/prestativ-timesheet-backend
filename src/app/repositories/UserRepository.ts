const User = require("../models/UserSchema");

class UserRepository {
  async findAll() {
    const users = await User.find();
    return users;
  }

  async findUsersByRole(role: string) {
    const users = await User.find({ role: role });
    return users;
  }

  async findByEmail(email: string) {
    const user = await User.findOne({ email: email });

    return user;
  }

  async create({ name, surname, email, password, role }) {
    const user = new User({
      name,
      surname,
      email,
      password,
      role,
    });

    await user.save();
    return user;
  }
}

module.exports = new UserRepository();
