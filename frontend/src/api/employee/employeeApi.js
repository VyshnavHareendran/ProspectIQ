import httpClient from "../httpClient";

export const employeeApi = {

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