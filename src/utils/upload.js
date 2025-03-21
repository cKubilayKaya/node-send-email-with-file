import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/mail");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const limits = {
  fileSize: process.env.UPLOAD_FILE_SIZE * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "application/pdf"];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Sadece resim (JPG, PNG, GIF) ve PDF dosyalarına izin verilmektedir."), false);
  }
};

export const upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter,
});
