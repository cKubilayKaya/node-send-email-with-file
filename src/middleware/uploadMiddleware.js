import multer from "multer";

export const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ success: false, error: "En fazla 5 dosya yükleyebilirsiniz." });
    }
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ success: false, error: `Dosya boyutu ${process.env.UPLOAD_FILE_SIZE}MB'ı geçemez.` });
    }
  } else if (err.message === "Unexpected field") {
    return res.status(400).json({ success: false, error: "Form verisi hatalı, beklenmeyen bir alan." });
  } else if (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
  next();
};
