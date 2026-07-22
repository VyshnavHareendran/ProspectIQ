import httpClient from "../../api/httpClient";

export const companyService = {
  getCompany(config = {}) {
    return httpClient.get("/settings/company", config);
  },
  updateCompany(data) {
    return httpClient.put("/settings/company", data);
  },
};
