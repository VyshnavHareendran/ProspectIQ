import httpClient from "../api/httpClient";

export const profileService = {

  async getProfile() {

    const response = await httpClient.get(
      "/profile/me"
    );

    return response.data;

  }

};