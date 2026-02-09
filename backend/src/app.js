import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import urlRoutes from "./routes/url.routes.js";
import redirectRoutes from "./routes/redirect.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

/* ---------------- path setup (ESM fix) ---------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------------- middleware ---------------- */
app.use(express.json());

/* ❗ In production, frontend & backend are same origin */
app.use(cors());

/* ---------------- API routes ---------------- */
app.use("/api/auth", authRoutes);
app.use("/api/urls", urlRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* ---------------- redirect routes ---------------- */
app.use("/", redirectRoutes);

/* ---------------- serve frontend ---------------- */
const frontendPath = path.join(__dirname, "../../frontend/dist");

app.use(express.static(frontendPath));

/* ❗ SPA fallback (VERY IMPORTANT for Vite/React routing) */
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

/* ---------------- error handler ---------------- */
app.use(errorHandler);

export default app;
