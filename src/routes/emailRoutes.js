import express from "express";
import { sendEmailController } from "../controllers/sendEmailController.js";
import { handleMulterErrors } from "../middleware/uploadMiddleware.js";
import { upload } from "../utils/upload.js";
import { getEmailsController } from "../controllers/getEmailsController.js";
import { getEmailController } from "../controllers/getEmailController.js";

const router = express.Router();

router.post("/send-email", upload.array("files", 5), handleMulterErrors, sendEmailController);
router.get("/get-emails", getEmailsController);
router.get("/get-email/:id", getEmailController);

export default router;
