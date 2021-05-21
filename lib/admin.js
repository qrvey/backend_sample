const { default: axios } = require("axios");

const axiosInstance = axios.create({
    baseURL: `${process.env.ADMIN_DOMAIN}`,
});

class Admin {
    static async login(data) {

        let response = await axiosInstance.post(`/login`, data);
        return response.data;
    }

    static async createReplacement(serverId, data, token) {

        let response = await axiosInstance.post(`/pubapi/admin/server/${serverId}/replacement`, data, {
            headers: {
                'Authorization': token,
            }
        });
        return response.data;
    }

    static async deleteReplacement(serverId, replacementId, replacementType, token) {

        let response = await axiosInstance.delete(`/pubapi/admin/server/${serverId}/replacement/${replacementId}/${replacementType}`, {
            headers: {
                'Authorization': token,
            }
        });
        return response.data;
    }

    static async getServer(serverId, token) {

        let response = await axiosInstance.get(`/pubapi/admin/server/${serverId}`, {
            headers: {
                'Authorization': token,
            }
        });
        return response.data;
    }

}

module.exports = Admin;