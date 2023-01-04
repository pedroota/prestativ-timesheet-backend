import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;

mongoose.set("strictQuery", false);
// mongoose.connect(
//   `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
// );

// mongoose.connection.on("error", () => console.error("connection error: "));
// mongoose.connection.once("open", () => console.log("database connected"));

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(
        `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
      )
      .then(() => {
        console.log("Database connected");
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

module.exports = new Database();
