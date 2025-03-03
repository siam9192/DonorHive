
import nodemailer from "nodemailer";
import envConfig from "../../config/env.config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: envConfig.app.userName,
    pass: envConfig.app.passKey,
  },
});

export default transporter;
