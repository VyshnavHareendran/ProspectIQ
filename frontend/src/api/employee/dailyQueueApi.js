import httpClient from "../httpClient";

export const dailyQueueApi = {

    getTodaysQueue() {
        return httpClient.get("/employee/todays-queue");
    },

    completeQueueItem(queueId) {
        return httpClient.put(
            `/employee/todays-queue/${queueId}/complete`
        );
    },

};