import { sendEmail } from "../services/emailService.js";
import prisma from "../utils/prisma.js";

export const sendEmailController = async (req, res) => {
  try {
    const { to, name, subject, html } = req.body;
    if (!to || !name || !subject || !html) {
      return res.status(400).json({ error: "Tüm alanlar gereklidir" });
    }

    const attachments = req.files.map((file) => ({
      filename: file.originalname,
      path: file.path,
      contentType: file.mimetype,
    }));

    const result = await sendEmail(to, name, subject, html, attachments);

    if (!result || result.error) {
      return res.status(400).json({ error: result?.error || "E-Posta gönderimi başarısız." });
    }

    const newAttachments = attachments.map((item) => item?.path.replace(/\\/g, "/"));

    await prisma.email.create({
      data: {
        to: to,
        subject: subject,
        body: html,
        status: "Sent",
        ...(newAttachments?.length >= 1 && { attachments: newAttachments }),
      },
    });

    res.status(200).json({ message: "E-posta gönderildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
