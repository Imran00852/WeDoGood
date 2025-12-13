import { Queue } from "bullmq";
import connection from "../config/redis.js";

export const reportQueue = new Queue("report-queue", {
  connection,
});
