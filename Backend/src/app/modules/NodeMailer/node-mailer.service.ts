import transporter from "./node-mailer.config";
import { ISendEmailData } from "./node-mailer.interface";

const sendEmail = async (data: ISendEmailData) => {
  return await transporter.sendMail({
    from: "gadgetgalaxy@gmail.com",
    to: data.emailAddress,
    subject: data.subject,
    html: data.template,
  });
};

const NodeMailerServices = {
  sendEmail,
};

export default NodeMailerServices;
