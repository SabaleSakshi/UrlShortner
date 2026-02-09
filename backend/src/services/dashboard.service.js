import Url from "../models/url.model.js";
import Analytics from "../models/analytics.model.js";
import mongoose from "mongoose";

export const getDashboardStats = async (userId) => {
  // 1. Get all URLs of this user
  const urls = await Url.find({ userId }).sort({ createdAt: -1 }).lean();

  const urlIds = urls.map((u) => u._id);

  if (urlIds.length === 0) {
    return {
      totalClicks: 0,
      clicksByDate: [],
      deviceStats: [],
      browserStats: [],
      geoStats: [],
      urls: [],
    };
  }

  // 2. Total clicks
  const totalClicks = await Analytics.countDocuments({
    urlId: { $in: urlIds },
  });

  // 3. Clicks per day
  const clicksByDate = await Analytics.aggregate([
    { $match: { urlId: { $in: urlIds } } },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$clickedAt",
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // 4. Device distribution
  const deviceStats = await Analytics.aggregate([
    { $match: { urlId: { $in: urlIds } } },
    {
      $group: {
        _id: "$device",
        count: { $sum: 1 },
      },
    },
  ]);

  // 5. Browser distribution
  const browserStats = await Analytics.aggregate([
    { $match: { urlId: { $in: urlIds } } },
    {
      $group: {
        _id: "$browser",
        count: { $sum: 1 },
      },
    },
  ]);

  // 6. Geo distribution
  const geoStats = await Analytics.aggregate([
    { $match: { urlId: { $in: urlIds } } },
    {
      $project: {
        country: {
          $ifNull: ["$country", "Unknown"],
        },
      },
    },
    {
      $group: {
        _id: "$country",
        count: { $sum: 1 },
      },
    },
  ]);

  // 7. Clicks per URL
  const clicksByUrl = await Analytics.aggregate([
    { $match: { urlId: { $in: urlIds } } },
    {
      $group: {
        _id: "$urlId",
        count: { $sum: 1 },
      },
    },
  ]);

  const clicksMap = new Map(
    clicksByUrl.map((item) => [item._id.toString(), item.count]),
  );

  const urlsWithClicks = urls.map((url) => ({
    ...url,
    clicks: clicksMap.get(url._id.toString()) || 0,
  }));

  return {
    totalClicks,
    clicksByDate,
    deviceStats,
    browserStats,
    geoStats,
    urls: urlsWithClicks,
  };
};
