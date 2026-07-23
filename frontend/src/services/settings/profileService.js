import httpClient from "../../api/httpClient";

export const profileService = {
  getProfile(config = {}) {
    return httpClient.get("/settings/profile", config);
  },
  updateProfile(data) {
    return httpClient.put("/settings/profile", data);
  },
  uploadProfilePhoto(file) {
    const formData = new FormData();

    formData.append("file", file);

    return httpClient.post("/settings/profile/photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  resetProfilePhoto() {
    return httpClient.delete("/settings/profile/photo");
  },
};
