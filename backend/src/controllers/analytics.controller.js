import { getUrlAnalytics } from "../services/analytics.service.js";
import Url from "../models/url.model.js";

export const fetchUrlAnalytics = async (req, res, next) => {
  try {
    const { urlId } = req.params;

    // Ensure user owns the URL
    const url = await Url.findOne({
      _id: urlId,
      userId: req.user.userId
    });

    if (!url) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const analytics = await getUrlAnalytics(urlId);

    res.status(200).json({
      urlId,
      shortUrl: url.shortUrl,
      analytics
    });
  } catch (error) {
    next(error);
  }
};
