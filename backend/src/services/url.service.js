import Url from "../models/url.model.js";
import { generateShortCode } from "../utils/generateCode.js";
import { isValidUrl } from "../utils/validateUrl.js";
import redisClient from "../config/redis.js";

export const createShortUrl = async ({
  userId,
  originalUrl,
  expiryDays,
  baseUrl
}) => {
  if (!isValidUrl(originalUrl)) {
    throw new Error("Invalid URL format");
  }

  const shortCode = generateShortCode();
  const shortUrl = `${baseUrl}/${shortCode}`;

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expiryDays);

  const url = await Url.create({
    userId,
    originalUrl,
    shortCode,
    shortUrl,
    expiresAt
  });
  
  await redisClient.setEx(
  shortCode,
  expiryDays * 24 * 60 * 60,
  JSON.stringify({
    id: url._id,
    originalUrl: url.originalUrl,
    expiresAt: url.expiresAt
  })
);
  return url;
};

export const getUserUrls = async (userId) => {
  return Url.find({ userId }).sort({ createdAt: -1 });
};
