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

  async create({ name, surname, email, password, role, createdAt, updatedAt }) {
    const user = new User({
      name,
      surname,
      email,
      password,
      role,
      createdAt,
      updatedAt,
    });

    await user.save();
    return user;
  }

  async findByIdAndUpdate({ id, name, surname, email, password, role }) {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        surname: surname,
        email: email,
        password: password,
        role: role,
        updatedAt: Date.now(),
      }
    );
    return user;
  }

  async findByIdAndUpdateToken({ id, token, expiration }) {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        passwordResetToken: token,
        passwordResetExpires: expiration,
      }
    );
    return user;
  }

  async findByEmailAndUpdatePassword({ email, password }) {
    const user = await User.findOneAndUpdate(
      { email: email },
      { password: password, updatedAt: Date.now() }
    );
    return user;
  }

  async findById(id: string) {
    const user = await User.findOne({ _id: id });

    return user;
  }

  async delete(id: string) {
    await User.findOneAndDelete({ _id: id });
    return;
  }
}

module.exports = new UserRepository();
