import nodemailer from "nodemailer";
import { emailConfig } from "../config/emailConfig.js";

const transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: emailConfig.auth,
});

export const sendEmail = async (to, name, subject, html, attachments) => {
  try {
    const mailOptions = {
      from: {
        name: name,
        address: emailConfig.auth.user,
      },
      to,
      subject,
      html,
      attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    return info?.messageId;
  } catch (error) {
    console.error("E-posta gönderme hatası:", error);
    throw new Error("E-posta gönderilemedi");
  }
};
