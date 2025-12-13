import express from "express";
import {
  createReport,
  uploadReports,
} from "../controllers/report.controller.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/report", createReport);

router.post("/reports/upload", upload.single("file"), uploadReports);

export default router;
