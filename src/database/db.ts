import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const { DB_URL, DB_USER, DB_PASS } = process.env;

mongoose.set("strictQuery", false);

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(`${DB_URL}`, {
        auth: {
          password: `${DB_PASS}`,
          username: `${DB_USER}`,
        },
        authSource: "admin",
      })
      .then(() => {
        console.log("Database connected");
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

module.exports = new Database();
