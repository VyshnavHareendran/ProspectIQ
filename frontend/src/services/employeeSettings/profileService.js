import httpClient from "../../api/httpClient";

export const employeeProfileService = {
  getProfile(config = {}) {
    return httpClient.get(
      "/employee/settings/profile",
      config
    );
  },

  updateProfile(data) {
    return httpClient.put(
      "/employee/settings/profile",
      data
    );
  },

  uploadProfilePhoto(file) {
    const formData = new FormData();

    formData.append("file", file);

    return httpClient.post(
      "/employee/settings/profile/photo",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  resetProfilePhoto() {
    return httpClient.delete("/employee/settings/profile/photo");
  },
};