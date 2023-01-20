import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const { DB_URL } = process.env;

mongoose.set("strictQuery", false);

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(`${DB_URL}`)
      .then(() => {
        console.log("Database connected");
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

module.exports = new Database();
