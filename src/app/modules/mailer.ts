import path from "path";
import nodemailer from "nodemailer";
const hbs = require("nodemailer-express-handlebars");

const emailEnv = process.env.MAIL_USERNAME;
const passEnv = process.env.MAIL_PASSWORD;

// estou utilizando com GMAIL para envio de SMTP
// se quiser testar insira o seu gmail no .env e depois habilite
// "senhas para apps" na sua conta google, vai gerar uma senha para você
// inserir no .env ------- para utilizar no hotmail as configs do SMTP são diferentes ;)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: emailEnv,
    pass: passEnv,
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: "handlebars",
    viewPath: path.resolve("./src/resources/mail/"),
    extName: ".html",
  })
);

module.exports = transporter;
