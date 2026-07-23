import httpClient from "../httpClient";

export const employeeManagementApi = {
  getEmployees() {
    return httpClient.get("/employees");
  },

  createEmployee(data) {
    return httpClient.post("/employees", data);
  },
  updateEmployee(id, data) {
    return httpClient.put(`/employees/${id}`, data);
  },
  resetPassword(id) {
    return httpClient.post(`/employees/${id}/reset-password`);
  },
  changeStatus(id, is_active) {
    return httpClient.patch(`/employees/${id}/status`, {
      is_active,
    });
  },
  deleteEmployee(id) {
    return httpClient.patch(`/employees/${id}/delete`);
  },
};