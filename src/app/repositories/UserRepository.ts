const User = require("../models/UserSchema");

class UserRepository {
  async findAll() {
    const users = await User.find();

    return users;
  }

  async findByEmail(email: string) {
    const user = await User.findOne({ email: email });

    return user;
  }

  async create({ name, surname, email, password }) {
    const user = new User({
      name,
      surname,
      email,
      password,
    });

    await user.save();
    return user;
  }
}

module.exports = new UserRepository();
