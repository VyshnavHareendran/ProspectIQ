import httpClient from "../../api/httpClient";

export const employeeSystemService = {
  getSystem() {
    return httpClient.get(
      "/employee/settings/system"
    );
  },
};