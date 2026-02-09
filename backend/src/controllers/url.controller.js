import {
  createShortUrl,
  getUserUrls
} from "../services/url.service.js";

export const createUrl = async (req, res, next) => {
  try {
    const { originalUrl, expiryDays } = req.body;

    const url = await createShortUrl({
      userId: req.user.userId,
      originalUrl,
      expiryDays: expiryDays || 7,
      baseUrl: `${req.protocol}://${req.get("host")}`
    });

    res.status(201).json({
      message: "Short URL created successfully",
      data: {
        id: url._id,
        originalUrl: url.originalUrl,
        shortUrl: url.shortUrl,
        expiresAt: url.expiresAt
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getMyUrls = async (req, res, next) => {
  try {
    const urls = await getUserUrls(req.user.userId);

    res.status(200).json({
      count: urls.length,
      data: urls
    });
  } catch (error) {
    next(error);
  }
};
