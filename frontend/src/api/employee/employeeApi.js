import httpClient from "../httpClient";

export const employeeApi = {

  getDashboard() {
    return httpClient.get("/employee/dashboard");
  },

  getMyLeads(search = "") {
    return httpClient.get("/employee/my-leads", {
      params: {
        search,
      },
    });
  },

  updateLead(assignmentId, data) {
    return httpClient.put(
      `/employee/my-leads/${assignmentId}`,
      data
    );
  },
  completeCall(data) {
    return httpClient.post(
      "/employee/calls/complete",
      data
    );
  },
  completeQueueItem(queueId) {
      return httpClient.put(
          `/employee/todays-queue/${queueId}/complete`
      );
  },

};