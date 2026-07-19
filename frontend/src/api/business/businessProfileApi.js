import httpClient from "../httpClient";

const businessProfileApi = {
    getProfile(businessId) {
        return httpClient.get(
            `/businesses/${businessId}/profile`
        );
    },
};

export default businessProfileApi;