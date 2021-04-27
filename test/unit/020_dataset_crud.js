'use strict';
let { expect } = require('chai');
let { mysqlData } = require('../resources/database');
let User = require('../../lib/user');
let Application = require('../../lib/application');
let Connection = require('../../lib/connection');
let Dataset = require('../../lib/dataset');

describe('Dataset: Dataset crud', function () {

    let userId, appId, connectionId, datasetId,
        email = 'alberto.valle+cx020@qrvey.com',
        appName = 'CX application',
        appDescription = 'App description';

    before(async function () {
        this.timeout(25000);

        // USER
        let userDetails = {
            email,
            password: 'qrvey123',
        };

        let userItem = await User.createUser(userDetails);
        userId = userItem.userid;

        let applicationDetails = {
            name: appName,
            description: appDescription,
        };

        // APPLICATION

        let appItem = await Application.createApplication(userId, applicationDetails);
        appId = appItem.appid;

        // CONNECTION

        let connectionDetails = {
            name: 'My connection',
            connectorType: 'MYSQL_LIVE',
            host: mysqlData.host,
            'user': mysqlData.user,
            'password': mysqlData.password,
        };

        let connectionItem = await Connection.createConnection(userId, appId, connectionDetails);
        connectionId = connectionItem.connectorid;
        return Promise.resolve();
    });

    after(async function () {
        this.timeout(10000);

        try {
            await Connection.deleteConnection(userId, appId, connectionId);
        } catch (error) {
            console.error('deleteConnection', JSON.stringify(error))
        }

        try {
            await Application.deleteApplication(userId, appId);
        } catch (error) {
            console.error('deleteApplication', JSON.stringify(error))
        }

        await User.deleteUser(userId);
        return Promise.resolve();

    });

    it('It should get a list of datasets', async function () {
        let datasets = await Dataset.getDatasets(userId, appId);

        expect(datasets).to.be.a('object');
        expect(datasets).to.have.property('Count').to.be.a('number').to.be.eq(0);
        expect(datasets).to.have.property('Items').to.be.a('array');
        return Promise.resolve('OK');
    });

    it('It should create a dataset from a data source (Connection)', async function () {
        this.timeout(5000);

        let dataSourceItem = {
            connectionId,
            database: mysqlData.databases.demo.databaseName,
            name: 'My Dataset',
            tableName: mysqlData.databases.demo.tableName,
        };

        let datasetItem = await Dataset.createDatasetFromConnection(userId, appId, dataSourceItem);

        expect(datasetItem).to.be.a('object');
        expect(datasetItem).to.have.property('datasetId').to.be.a('string');
        expect(datasetItem).to.have.property('appId').to.be.a('string').to.be.eq(appId);
        expect(datasetItem).to.have.property('userId').to.be.a('string').to.be.eq(userId);
        expect(datasetItem).to.have.property('status').to.be.a('string').to.be.eq('DRAFT');
        expect(datasetItem).to.have.property('datasources').to.be.a('array').to.has.lengthOf(1);
        expect(datasetItem.datasources[0]).to.have.property('connectionId').to.be.a('string').to.be.eq(connectionId);
        expect(datasetItem.datasources[0]).to.have.property('database').to.be.a('string').to.be.eq(mysqlData.databases.demo.databaseName);
        expect(datasetItem.datasources[0]).to.have.property('tableName').to.be.a('string').to.be.eq(mysqlData.databases.demo.tableName);
        expect(datasetItem).to.have.property('columns').to.be.a('array');

        datasetId = datasetItem.datasetId;

        return Promise.resolve('OK');
    });

    it('It should get a list of datasets', async function () {
        let datasets = await Dataset.getDatasets(userId, appId);

        expect(datasets).to.be.a('object');
        expect(datasets).to.have.property('Count').to.be.a('number').to.be.eq(1);
        expect(datasets).to.have.property('Items').to.be.a('array');
        return Promise.resolve('OK');
    });

    it('It should get a dataset', async function () {
        let datasetItem = await Dataset.getDataset(userId, appId, datasetId);

        expect(datasetItem).to.be.a('object');
        expect(datasetItem).to.have.property('datasetId').to.be.a('string');
        expect(datasetItem).to.have.property('appId').to.be.a('string').to.be.eq(appId);
        expect(datasetItem).to.have.property('userId').to.be.a('string').to.be.eq(userId);
        expect(datasetItem).to.have.property('status').to.be.a('string').to.be.eq('DRAFT');
        expect(datasetItem).to.have.property('datasources').to.be.a('array').to.has.lengthOf(1);
        expect(datasetItem.datasources[0]).to.have.property('connectionId').to.be.a('string').to.be.eq(connectionId);
        expect(datasetItem.datasources[0]).to.have.property('database').to.be.a('string').to.be.eq(mysqlData.databases.demo.databaseName);
        expect(datasetItem.datasources[0]).to.have.property('tableName').to.be.a('string').to.be.eq(mysqlData.databases.demo.tableName);
        expect(datasetItem).to.have.property('columns').to.be.a('array');
        return Promise.resolve('OK');
    });

    it('It should get load an existing dataset', async function () {
        this.timeout(10000);
        let datasetItem = await Dataset.loadDataset(userId, appId, datasetId);

        expect(datasetItem).to.be.a('object');
        return Promise.resolve('OK');
    });

    it('It should get load an existing dataset', async function () {
        this.timeout(30000);
        await new Promise(resolve => setTimeout(resolve, 28000));
        return Promise.resolve('OK');
    });

    it('It should delete a dataset', async function () {
        this.timeout(10000);
        let datasetItem = await Dataset.deleteDataset(userId, appId, datasetId);

        expect(datasetItem).to.be.a('object');
        expect(datasetItem).to.have.property('datasetId').to.be.a('string').to.be.eq(datasetId);
        return Promise.resolve('OK');
    });
});