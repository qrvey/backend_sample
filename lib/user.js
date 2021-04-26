const { axiosInstance } = require('./helpers/axios');

class User {
    static async createUser(data) {

        let response = await axiosInstance.post(`/core/user`, data);
        return response.data;
    }

    static async deleteUser(userId) {

        let response = await axiosInstance.delete(`/core/user/${userId}`);
        return response.data;
    }

    static async getUser(userId) {

        let response = await axiosInstance.get(`/core/user/${userId}`);
        return response.data;
    }
}

module.exports = User;