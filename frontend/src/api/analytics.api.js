import api from "./axios";

export const getUrlAnalytics = (urlId) => api.get(`/api/analytics/${urlId}`);
export const getAnalyticsOverview = () => api.get("/api/dashboard");
