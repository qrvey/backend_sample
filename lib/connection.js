const { axiosInstance } = require('./helpers/axios');

class Connection {
    static async createConnection(userId, appId, data) {

        let response = await axiosInstance.post(`/user/${userId}/app/${appId}/connections`, data);
        return response.data;
    }

    static async deleteConnection(userId, appId, connectionId) {

        let response = await axiosInstance.delete(`/user/${userId}/app/${appId}/connections/${connectionId}`);
        return response.data;
    }

    static async getConnection(userId, appId, connectionId) {

        let response = await axiosInstance.get(`/user/${userId}/app/${appId}/connections/${connectionId}`);
        return response.data;
    }

    static async getConnections(userId, appId, data) {

        let response = await axiosInstance.post(`/user/${userId}/app/${appId}/connections/all`, data);
        return response.data;
    }
}

module.exports = Connection;