import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { errorHandler } from "./app/middlewares/errorHandler";
import "./database/db";
const routes = require("./routes");
const app = express();

app.use(express.json());
// app.use(errorHandler);
app.use(routes);

app.listen(process.env.SERVER_PORT, () => {
  return console.log(`🚀 Server is running at ${process.env.SERVER_PORT}`);
});
