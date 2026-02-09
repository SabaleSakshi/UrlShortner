import express from "express";
import { fetchUrlAnalytics } from "../controllers/analytics.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:urlId", authMiddleware, fetchUrlAnalytics);

export default router;
