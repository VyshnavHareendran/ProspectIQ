import httpClient from "../httpClient";

export const leadAssignmentApi = {

  getAssignments(page = 1, pageSize = 20) {
    return httpClient.get("/lead-assignments", {
      params: {
        page,
        page_size: pageSize,
      },
    });
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