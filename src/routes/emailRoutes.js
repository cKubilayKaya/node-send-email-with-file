import express from "express";
import { sendEmailController } from "../controllers/emailController.js";
import { handleMulterErrors } from "../middleware/uploadMiddleware.js";
import { upload } from "../utils/upload.js";

const router = express.Router();

router.post("/send-email", upload.array("files", 5), handleMulterErrors, sendEmailController);

export default router;
