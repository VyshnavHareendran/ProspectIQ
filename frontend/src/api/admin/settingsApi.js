import httpClient from "../httpClient";

export const settingsApi = {
  getCompany() {
    return httpClient.get("/settings/company");
  },

  updateCompany(data) {
    return httpClient.put("/settings/company", data);
  },
  getDashboard() {
    return httpClient.get("/settings/dashboard");
  },

  updateDashboard(data) {
    return httpClient.put("/settings/dashboard", data);
  },
  getAppearance() {
    return httpClient.get("/settings/appearance");
  },

  updateAppearance(data) {
    return httpClient.put("/settings/appearance", data);
  },
  getSystem() {
    return httpClient.get("/settings/system");
  },
};