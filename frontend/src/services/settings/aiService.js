import httpClient from "../../api/httpClient";

export const aiService = {
  getAISettings(config = {}) {
    return httpClient.get("/settings/ai", config);
  },
  updateAISettings(data) {
    return httpClient.put("/settings/ai", data);
  },
};
