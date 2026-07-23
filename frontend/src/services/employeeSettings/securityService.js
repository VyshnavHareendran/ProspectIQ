import httpClient from "../../api/httpClient";

export const employeeSecurityService = {
  changePassword(data) {
    return httpClient.post(
      "/employee/settings/security/change-password",
      data
    );
  },

  getCurrentSession() {
    return httpClient.get(
      "/employee/settings/security/session"
    );
  },
};