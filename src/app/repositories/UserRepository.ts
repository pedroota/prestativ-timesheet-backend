const User = require("../models/UserSchema");

class UserRepository {
  async findAll() {
    const users = await User.find().populate("activities").lean().exec();

    return users;
  }

  async findUsersByRole(role: string) {
    const users = await User.find({ role: role })
      .populate("activities")
      .lean()
      .exec();

    return users;
  }

  async findByEmail(email: string) {
    const user = await User.findOne({ email: email })
      .populate("activities")
      .lean()
      .exec();

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
    )
      .populate("activities")
      .lean()
      .exec();

    return user;
  }

  async findByIdAndUpdateToken({ id, token, expiration }) {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        passwordResetToken: token,
        passwordResetExpires: expiration,
      }
    )
      .populate("activities")
      .lean()
      .exec();

    return user;
  }

  async findById(id: string) {
    const user = await User.findOne({ _id: id })
      .populate("activities")
      .lean()
      .exec();

    return user;
  }

  async delete(id: string) {
    await User.findOneAndDelete({ _id: id });
    return;
  }
}

module.exports = new UserRepository();
