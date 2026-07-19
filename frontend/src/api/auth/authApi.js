import httpClient from '../httpClient'

export const authApi = {
  login(credentials) {
    return httpClient.post('/auth/login', credentials)
  },
  getCurrentUser(config = {}) {
    return httpClient.get('/auth/me', config)
  },
  changePassword(data) {
    return httpClient.post("/auth/change-password", data);
  },
  getEmployees() {
    return httpClient.get("/employees");
  },
  createEmployee(data) {
    return httpClient.post("/employees", data);
  },
  changeEmployeeStatus(id, is_active) {
      return httpClient.patch(`/employees/${id}/status`, {
          is_active,
      });
  },
}
