import httpClient from "../../api/httpClient";

export const employeeDashboardService = {
  getDashboard() {
    return httpClient.get(
      "/employee/settings/dashboard"
    );
  },

  updateDashboard(data) {
    return httpClient.put(
      "/employee/settings/dashboard",
      data
    );
  },
};