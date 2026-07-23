import httpClient from "../../api/httpClient";

export const employeeAppearanceService = {
  getAppearance() {
    return httpClient.get(
      "/employee/settings/appearance"
    );
  },

  updateAppearance(data) {
    return httpClient.put(
      "/employee/settings/appearance",
      data
    );
  },
};