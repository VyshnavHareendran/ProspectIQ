import httpClient from "../httpClient";

export const leadScoreApi = {

  getLeadScores(params = {}) {
    return httpClient.get("/lead-scores", {
      params,
    });
  },

  getHighPriorityLeads() {
    return httpClient.get("/lead-scores/high-priority");
  },

  getStatistics() {
    return httpClient.get("/lead-scores/statistics");
  },

  getDailyCallList() {
    return httpClient.get("/lead-scores/daily-call-list");
  },

  generateLeadScore(businessId) {
    return httpClient.post(
      `/lead-scores/generate/${businessId}`
    );
  },

  generateAllLeadScores() {
    return httpClient.post(
      "/lead-scores/generate-all"
    );
  }

};