const { default: axios } = require("axios");

const axiosInstance = axios.create({
    baseURL: `${process.env.ADMIN_DOMAIN}`,
});

class ContentDeployment {

    static async createRelease(data, token) {

        let response = await axiosInstance.post('/qrvey/admin/features/release', data, {
            headers: {
                'Authorization': token,
            }
        });
        return response.data;
    }

    static async delete(releaseId, token) {

        let response = await axiosInstance.delete(`/qrvey/admin/features/release/${releaseId}`, {
            headers: {
                'Authorization': token,
            }
        });
        return response.data;
    }

    static async deploy(releaseId, token) {

        let response = await axiosInstance.post(`/qrvey/admin/release/${releaseId}/deploy`, null, {
            headers: {
                'Authorization': token,
            }
        });
        return response.data;
    }

    static async getReleases(token) {

        let response = await axiosInstance.post('/qrvey/admin/features/release/all', null, {
            headers: {
                'Authorization': token,
            }
        });
        return response.data;
    }

    static async getRelease(releaseId, token) {

        let response = await axiosInstance.get(`/qrvey/admin/features/release/${releaseId}`, {
            headers: {
                'Authorization': token,
            }
        });
        return response.data;
    }

    static async updateRelease(releaseId, data, token) {

        let response = await axiosInstance.put(`/qrvey/admin/features/release/${releaseId}`, data, {
            headers: {
                'Authorization': token,
            }
        });
        return response.data;
    }

}

module.exports = ContentDeployment;