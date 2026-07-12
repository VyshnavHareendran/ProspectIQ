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

  importBusinesses: (uploadId, mapping) =>
  httpClient.post("/imports/businesses", {
    upload_id: uploadId,
    mapping,
  }),

  getUploadHistory: () =>
    httpClient.get("/uploads/history"),
};