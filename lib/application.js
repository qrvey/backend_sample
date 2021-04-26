const { axiosInstance } = require('./helpers/axios');

class Application {
    static async createApplication(userId, data) {

        let response = await axiosInstance.post(`/user/${userId}/app`, data);
        return response.data;
    }

    static async deleteApplication(userId, appId) {

        let response = await axiosInstance.delete(`/user/${userId}/app/${appId}`);
        return response.data;
    }

    static async getApplication(userId, appId) {

        let response = await axiosInstance.get(`/user/${userId}/app/${appId}`);
        return response.data;
    }

    static async getApplications(userId, appId, data) {

        let response = await axiosInstance.post(`/user/${userId}/app/${appId}/all`, data);
        return response.data;
    }
}

module.exports = Application;