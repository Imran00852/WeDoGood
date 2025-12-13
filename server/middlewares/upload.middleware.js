import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "text/csv") {
      cb(new Error("Only CSV files are allowed"), false);
    }
    cb(null, true);
  },
});

export default upload;
