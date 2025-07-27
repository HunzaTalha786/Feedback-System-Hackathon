import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import feedbackRoutes from "./routes/feedbackRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

// ✅ Use fixed origin here to be safe
app.use(
  cors({
    origin: "https://feedback-system-hackathon-wwh9.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ Handle preflight requests with same config
app.options("*", cors({
  origin: "https://feedback-system-hackathon-wwh9.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("✅ Student Feedback API is running");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    // ✅ Only listen in development; in Vercel, skip this
    if (process.env.NODE_ENV !== "production") {
      app.listen(process.env.PORT || 5000, () =>
        console.log(`Server running on http://localhost:${process.env.PORT}`)
      );
    }
  })
  .catch((err) => console.log(err));

export default app; // ✅ Important for Vercel serverless function
