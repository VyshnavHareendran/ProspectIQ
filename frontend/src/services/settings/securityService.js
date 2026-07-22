import httpClient from "../../api/httpClient";

export const securityService = {
  getCurrentSession(config = {}) {
    return httpClient.get("/settings/security/session", config);
  },
  changePassword(data) {
    return httpClient.post("/settings/security/change-password", data);
  },
  logoutOtherDevices() {
    return httpClient.post("/settings/security/logout-other-devices");
  },
};
