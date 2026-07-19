import httpClient from "../httpClient";

export const leadAssignmentApi = {

  getAssignments() {
    return httpClient.get("/lead-assignments");
  },

  assignLead(data) {
    return httpClient.post(
      "/lead-assignments",
      data
    );
  },

  updateAssignment(id, data) {
    return httpClient.put(
      `/lead-assignments/${id}`,
      data
    );
  },

  getBulkAssignmentStats() {
    return httpClient.get(
      "/lead-assignments/bulk/stats"
    );
  },

  bulkAssign(data) {
    return httpClient.post(
        "/lead-assignments/bulk",
        data
    );
  },

  deleteAssignment(id) {
    return httpClient.delete(
      `/lead-assignments/${id}`
    );
  }

};