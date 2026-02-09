import Analytics from "../models/analytics.model.js";
import mongoose from "mongoose";

export const getUrlAnalytics = async (urlId) => {
  const objectId = new mongoose.Types.ObjectId(urlId);

  const totalClicks = await Analytics.countDocuments({ urlId: objectId });

  const clicksByDate = await Analytics.aggregate([
    { $match: { urlId: objectId } },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$clickedAt" }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const deviceStats = await Analytics.aggregate([
    { $match: { urlId: objectId } },
    {
      $group: {
        _id: "$device",
        count: { $sum: 1 }
      }
    }
  ]);

  const browserStats = await Analytics.aggregate([
    { $match: { urlId: objectId } },
    {
      $group: {
        _id: "$browser",
        count: { $sum: 1 }
      }
    }
  ]);

  const osStats = await Analytics.aggregate([
    { $match: { urlId: objectId } },
    {
      $group: {
        _id: "$os",
        count: { $sum: 1 }
      }
    }
  ]);

  return {
    totalClicks,
    clicksByDate,
    deviceStats,
    browserStats,
    osStats
  };
};
