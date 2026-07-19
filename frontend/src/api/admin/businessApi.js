import httpClient from "../httpClient";

export const businessApi = {
  // GET
  getBusinesses: (params, config = {}) =>
    httpClient.get("/businesses", {
      ...config,
      params,
    }),

  // POST
  addBusiness: (data) =>
    httpClient.post("/businesses", data),

  // PUT
  updateBusiness: (id, data) =>
    httpClient.put(`/businesses/${id}`, data),

  // DELETE
  deleteBusiness: (id) =>
    httpClient.delete(`/businesses/${id}`),
};