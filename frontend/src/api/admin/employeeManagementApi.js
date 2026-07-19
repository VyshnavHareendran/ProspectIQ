import httpClient from "../httpClient";

export const employeeManagementApi = {
  getEmployees() {
    return httpClient.get("/employees");
  },

  createEmployee(data) {
    return httpClient.post("/employees", data);
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