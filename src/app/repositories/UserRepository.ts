const User = require("../models/UserSchema");

class UserRepository {
  async findAll() {
    const users = await User.find()
      .populate([{ path: "activities" }, { path: "role" }])
      .lean()
      .exec();

    return users;
  }

  async findSome(startIndex) {
    const users = await User.find().limit(10).skip(startIndex).exec();

    return users;
  }

  async findUsersByRole(role: string) {
    const users = await User.find({ role: role })
      .populate([{ path: "activities" }, { path: "role" }])
      .lean()
      .exec();

    return users;
  }

  async findByEmail(email: string) {
    const user = await User.findOne({ email: email })
      .populate([{ path: "activities" }, { path: "role" }])
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
      .populate([{ path: "activities" }, { path: "role" }])
      .lean()
      .exec();

    return user;
  }

  async findByEmailAndUpdateToken({ email, token }) {
    const now = new Date();

    const user = await User.findOneAndUpdate(
      { email: email },
      {
        passwordResetToken: token,
        passwordResetExpires: now.setHours(now.getHours() + 1),
      },
      {
        returnOriginal: false,
      }
    );
    return user;
  }

  async findByEmailAndUpdatePassword({ email, password }) {
    const user = await User.findOneAndUpdate(
      { email: email },
      {
        password: password,
        updatedAt: Date.now(),
      }
    )
      .populate([{ path: "activities" }, { path: "role" }])
      .lean()
      .exec();

    return user;
  }

  async findById(id: string) {
    const user = await User.findOne({ _id: id })
      .populate([{ path: "activities" }, { path: "role" }])
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
