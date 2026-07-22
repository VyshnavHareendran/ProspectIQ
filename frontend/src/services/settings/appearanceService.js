import httpClient from "../../api/httpClient";

export const appearanceService = {
  getPreferences(config = {}) {
    return httpClient.get("/settings/appearance", config);
  },
  updatePreferences(data) {
    return httpClient.put("/settings/appearance", data);
  },
};
