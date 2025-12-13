import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    ngoId: {
      type: String,
      required: true,
      trim: true,
    },
    month: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}$/,
    },
    peopleHelped: {
      type: Number,
      required: true,
      min: 0,
    },
    eventsConducted: {
      type: Number,
      required: true,
      min: 0,
    },
    fundsUtilized: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

//prevent duplicate reports for the same NGO and month
reportSchema.index({ ngoId: 1, month: 1 }, { unique: true });

export const Report = mongoose.model("Report", reportSchema);
