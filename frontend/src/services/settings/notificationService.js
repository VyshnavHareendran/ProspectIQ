import httpClient from "../../api/httpClient";

export const notificationService = {
  getPreferences(config = {}) {
    return httpClient.get("/settings/notifications", config);
  },
  updatePreferences(data) {
    return httpClient.put("/settings/notifications", data);
  },
};
