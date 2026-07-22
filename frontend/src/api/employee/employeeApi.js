import httpClient from "../httpClient";

export const employeeApi = {

  getDashboard() {
    return httpClient.get("/employee/dashboard");
  },

  getMyLeads() {
    return httpClient.get("/employee/my-leads");
  },

  updateLead(assignmentId, data) {
    return httpClient.put(
      `/employee/my-leads/${assignmentId}`,
      data
    );
  },

};