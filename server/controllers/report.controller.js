import { Report } from "../models/Report.js";
import { v4 as uuidv4 } from "uuid";
import { Job } from "../models/Job.js";
import { reportQueue } from "../workers/reportQueue.js";

export const createReport = async (req, res) => {
  try {
    const { ngoId, month, peopleHelped, eventsConducted, fundsUtilized } =
      req.body;

    if (
      !ngoId ||
      !month ||
      peopleHelped == null ||
      eventsConducted == null ||
      fundsUtilized == null
    ) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    }

    const report = await Report.create({
      ngoId,
      month,
      peopleHelped,
      eventsConducted,
      fundsUtilized,
    });

    return res.status(201).json({
      msg: "Report submitted successfully",
      report,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        msg: "Report for this NGO and month already exists",
      });
    }
    return res.status(500).json({
      success: false,
      msg: err.message || "Internal Server Error",
    });
  }
};

export const uploadReports = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        msg: "CSV file is required",
      });
    }

    const jobId = uuidv4();

    // Create job record
    await Job.create({
      jobId,
      status: "pending",
    });

    // Push job to queue
    await reportQueue.add("process-csv", {
      jobId,
      fileBuffer: req.file.buffer.toString("base64"),
    });

    return res.status(202).json({
      success: true,
      msg: "CSV uploaded successfully",
      jobId,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Failed to upload CSV",
    });
  }
};
