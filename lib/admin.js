const { default: axios } = require("axios");

const axiosInstance = axios.create({
    baseURL: `${process.env.ADMIN_DOMAIN}`,
});

class Admin {
    static async login(data) {

        let response = await axiosInstance.post(`/login`, data);
        return response.data;
    }

}

module.exports = Admin;