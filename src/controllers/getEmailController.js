import prisma from "../utils/prisma.js";

export const getEmailController = async (req, res) => {
  const { id } = req.params;
  try {
    const getEmail = await prisma.email.findUnique({
      where: {
        id: id,
      },
    });

    res.status(200).json({ success: true, data: getEmail });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
