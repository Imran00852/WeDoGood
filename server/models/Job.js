import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    totalRecords: {
      type: Number,
      default: 0,
    },
    processedRecords: {
      type: Number,
      default: 0,
    },
    failedRecords: {
      type: Number,
      default: 0,
    },
    errors: [
      {
        row: Number,
        message: String,
      },
    ],
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
