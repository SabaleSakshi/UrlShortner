import express from "express";
import { createUrl, getMyUrls } from "../controllers/url.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createUrl);
router.get("/", authMiddleware, getMyUrls);

export default router;
