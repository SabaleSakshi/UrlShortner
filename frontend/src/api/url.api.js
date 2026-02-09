import api from "./axios";
export const createUrl = (data) => api.post("/api/urls", data);
