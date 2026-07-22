import httpClient from "../../api/httpClient";

export const systemService = {
  getSystemInfo(config = {}) {
    return httpClient.get("/settings/system", config);
  },
};
