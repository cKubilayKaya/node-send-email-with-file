import { sendEmail } from "../services/emailService.js";

export const sendEmailController = async (req, res) => {
  try {
    const { to, name, subject, text, html } = req.body;
    if (!to || !name || !subject || !text) {
      return res.status(400).json({ error: "Tüm alanlar gereklidir" });
    }

    const attachments = req.files.map((file) => ({
      filename: file.originalname,
      path: file.path,
      contentType: file.mimetype,
    }));

    const result = await sendEmail(to, name, subject, text, html, attachments);
    res.status(200).json({ message: "E-posta gönderildi", info: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
