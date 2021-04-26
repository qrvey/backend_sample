const { axiosInstance } = require('./helpers/axios');

class Dataset {
    static async createDatasetFromConnection(userId, appId, data) {

        let response = await axiosInstance.post(`/user/${userId}/app/${appId}/qollect/dataset/datasource`, data);
        return response.data;
    }

    static async deleteDataset(userId, appId, datasetId) {

        let response = await axiosInstance.delete(`/user/${userId}/app/${appId}/qollect/dataset/${datasetId}`);
        return response.data;
    }

    static async getDataset(userId, appId, datasetId) {

        let response = await axiosInstance.get(`/user/${userId}/app/${appId}/qollect/dataset/${datasetId}`);
        return response.data;
    }

    static async getDatasets(userId, appId, data) {

        let response = await axiosInstance.post(`/user/${userId}/app/${appId}/qollect/dataset/all`, data);
        return response.data;
    }

    static async loadDataset(userId, appId, datasetId) {

        let response = await axiosInstance.post(`/user/${userId}/app/${appId}/qollect/dataset/${datasetId}/load`);
        return response.data;
    }
}

module.exports = Dataset;