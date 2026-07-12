import httpClient from "./httpClient";

export const callLogApi = {
  createCallLog: (data) =>
    httpClient.post("/call-logs", data),

  getCallLog: (callLogId) =>
    httpClient.get(`/call-logs/${callLogId}`),

  getBusinessCallLogs: (businessId) =>
    httpClient.get(`/call-logs/business/${businessId}`),

  getEmployeeCallLogs: (employeeId) =>
    httpClient.get(`/call-logs/employee/${employeeId}`),

  getTodayFollowups: () =>
    httpClient.get("/call-logs/followups/today"),

  getPendingFollowups: () =>
    httpClient.get("/call-logs/followups/pending"),

  updateCallLog: (callLogId, data) =>
    httpClient.put(`/call-logs/${callLogId}`, data),

  deleteCallLog: (callLogId) =>
    httpClient.delete(`/call-logs/${callLogId}`),
};