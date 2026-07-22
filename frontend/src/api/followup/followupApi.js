import httpClient from "../httpClient";

export const followupApi = {

    getFollowups() {

        return httpClient.get("/employee/followups");

    },

};