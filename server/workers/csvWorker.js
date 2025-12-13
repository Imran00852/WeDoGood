import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});

import { Worker } from "bullmq";
import csv from "csv-parser";
import { Readable } from "stream";

import connection from "../config/redis.js";
import { Report } from "../models/Report.js";
import { Job } from "../models/Job.js";
import { connectDB } from "../config/db.js";

await connectDB();

//BullMQ Worker
const worker = new Worker(
  "report-queue",
  async (job) => {
    const { jobId, fileBuffer } = job.data;

    // Decode Base64 CSV back to Buffer
    const buffer = Buffer.from(fileBuffer, "base64");

    const jobRecord = await Job.findOne({ jobId });
    if (!jobRecord) return;

    jobRecord.status = "processing";
    await jobRecord.save();

    //parse CSV
    const rows = [];
    const stream = Readable.from([buffer.toString("utf8")]);

    await new Promise((resolve, reject) => {
      stream
        .pipe(csv())
        .on("data", (row) => rows.push(row))
        .on("end", resolve)
        .on("error", reject);
    });

    jobRecord.totalRecords = rows.length;
    await jobRecord.save();

    //process rows
    let processed = 0;
    let failed = 0;

    for (let i = 0; i < rows.length; i++) {
      try {
        const row = rows[i];

        await Report.create({
          ngoId: row.ngoId,
          month: row.month,
          peopleHelped: Number(row.peopleHelped),
          eventsConducted: Number(row.eventsConducted),
          fundsUtilized: Number(row.fundsUtilized),
        });

        processed++;
      } catch (err) {
        failed++;
        jobRecord.errors.push({
          row: i + 1,
          message: err.code === 11000 ? "Duplicate NGO + month" : err.message,
        });
      }

      jobRecord.processedRecords = processed;
      jobRecord.failedRecords = failed;
      await jobRecord.save();
    }

    jobRecord.status = "completed";
    await jobRecord.save();
  },
  { connection }
);

export default worker;
