import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";

import reportRoutes from "./routes/report.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import jobRoutes from "./routes/job.routes.js";

config({
  path: "./.env",
});

connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
  })
);

app.use(express.json());

//apis
app.use("/api/v1", reportRoutes);
app.use("/api/v1", dashboardRoutes);
app.use("/api/v1", jobRoutes);

//home route
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to the server!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
