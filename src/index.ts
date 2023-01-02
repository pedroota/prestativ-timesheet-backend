import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  return console.log(`🚀 Server is running at ${process.env.PORT}`);
});
