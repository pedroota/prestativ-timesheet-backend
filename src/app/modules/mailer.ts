import path from "path";
import nodemailer from "nodemailer";
const hbs = require("nodemailer-express-handlebars");

const transport = nodemailer.createTransport({
  host: "smtp.mandrillapp.com",
  port: 587,
  auth: {
    user: "Developer Filipe Bacof",
    pass: "md-ceIoQsYzlJuZM_58XkMV3w",
  },
});

transport.use(
  "compile",
  hbs({
    viewEngine: "handlebars",
    viewPath: path.resolve("./src/resources/mail/"),
    extName: ".html",
  })
);

module.exports = transport;
