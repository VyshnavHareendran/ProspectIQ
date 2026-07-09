import httpClient from "./httpClient";

export const uploadApi = {
  previewCSV: (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return httpClient.post(
      "/uploads/businesses/preview",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  importBusinesses: (data) =>
    httpClient.post("/imports/businesses", data),

  getUploadHistory: () =>
    httpClient.get("/uploads/history"),
};