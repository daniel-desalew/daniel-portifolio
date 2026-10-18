import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin is not allowed by CORS"));
    },
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use("/api", apiLimiter);

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

await connectDB();
app.listen(process.env.PORT || 5000, () => console.log("API running"));
