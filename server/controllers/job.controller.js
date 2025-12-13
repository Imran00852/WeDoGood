import { Job } from "../models/Job.js";

export const getJobStatus = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findOne({ jobId });

    if (!job) {
      return res.status(404).json({
        success: false,
        msg: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
