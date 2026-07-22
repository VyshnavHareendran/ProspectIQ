import httpClient from "../../api/httpClient";

export const dashboardService = {
  getPreferences(config = {}) {
    return httpClient.get("/settings/dashboard", config);
  },
  updatePreferences(data) {
    return httpClient.put("/settings/dashboard", data);
  },
};
