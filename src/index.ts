import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
const cookieParser = require("cookie-parser");
// import { errorHandler } from "./app/middlewares/errorHandler";
import "./database/db";
const cors = require("cors");
const routes = require("./routes");
const app = express();
const port = 21050;

app.use(cors());
// app.use(errorHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);

app.listen(process.env.PORT, () => {
  return console.log(`🚀 Server is running at ${process.env.PORT}`);
});

app.get("/", (_req, res) => {
  res.send(
    "Ola, esta aplicacao esta rodando em NodeJS versao " + process.version
  );
});

app.get("/", (_req, res) => {
  res.send(
    "Ola, esta aplicacao esta rodando em NodeJS versao " + process.version
  );
});
