import prisma from "../utils/prisma.js";

export const getEmailsController = async (req, res) => {
  try {
    const getAllEmails = await prisma.email.findMany();

    res.status(200).json({ success: true, data: getAllEmails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
