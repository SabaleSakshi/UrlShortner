import { getDashboardStats } from "../services/dashboard.service.js";

export const getDashboard = async (req, res, next) => {
  try {
    const stats = await getDashboardStats(req.user.userId);

    res.status(200).json({
      message: "Dashboard data fetched successfully",
      data: stats
    });
  } catch (error) {
    next(error);
  }
};
