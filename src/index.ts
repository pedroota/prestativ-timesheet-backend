import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
const cookieParser = require("cookie-parser");
// import { errorHandler } from "./app/middlewares/errorHandler";
import "./database/db";
const cors = require("cors");
const routes = require("./routes");
const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(errorHandler);
app.use(cors());
app.use(routes);

app.listen(process.env.SERVER_PORT, () => {
  return console.log(`🚀 Server is running at ${process.env.SERVER_PORT}`);
});
