import express from "express";
import { redirectToOriginalUrl } from "../controllers/redirect.controller.js";

const router = express.Router();

router.get("/:shortCode", redirectToOriginalUrl);

export default router;
