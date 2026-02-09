import Url from "../models/url.model.js";
import Analytics from "../models/analytics.model.js";
import redisClient from "../config/redis.js";
import { detectDeviceInfo } from "../utils/detectDevice.js";
import geoip from "geoip-lite";

export const handleRedirect = async ({ shortCode, req }) => {
  // 1️⃣ Try Redis first
  const cachedUrl = await redisClient.get(shortCode);

  let url;

  console.log(cachedUrl ? "REDIS HIT" : "REDIS MISS");
  if (cachedUrl) {
    url = JSON.parse(cachedUrl);
  } else {
    // 2️⃣ Fallback to MongoDB
    const dbUrl = await Url.findOne({ shortCode });

    if (!dbUrl || !dbUrl.isActive) {
      throw new Error("Short URL not found or inactive");
    }

    if (dbUrl.expiresAt < new Date()) {
      dbUrl.isActive = false;
      await dbUrl.save();
      throw new Error("Short URL expired");
    }

    url = {
      id: dbUrl._id,
      originalUrl: dbUrl.originalUrl,
      expiresAt: dbUrl.expiresAt
    };

    // 3️⃣ Cache in Redis with TTL
    const ttl =
      Math.floor((new Date(dbUrl.expiresAt).getTime() - Date.now()) / 1000);

    if (ttl > 0) {
      await redisClient.setEx(shortCode, ttl, JSON.stringify(url));
    }
  }

  // 4️⃣ Analytics logging (always from request)
  const { device, browser, os } = detectDeviceInfo(
    req.headers["user-agent"]
  );

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  const geo = geoip.lookup(ip);
  const country = geo ? geo.country : "Unknown";

  await Analytics.create({
    urlId: url.id,
    ipAddress: ip,
    userAgent: req.headers["user-agent"],
    device,
    browser,
    os,
    country
  });

  return url.originalUrl;
};
