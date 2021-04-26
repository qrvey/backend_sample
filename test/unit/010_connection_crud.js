let { expect } = require('chai');
let { mysqlData } = require('../resources/database');
let User = require('../../lib/user');
let Application = require('../../lib/application');
let Connection = require('../../lib/connection');


describe('Connection: Connection crud', function () {
    let userId, appId, connectionId,
        email = 'alberto.valle+cx010@qrvey.com',
        appName = 'CX application',
        appDescription = 'App description';

    before(async function () {
        this.timeout(25000);

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

        let appItem = await Application.createApplication(userId, applicationDetails);
        appId = appItem.appid;

        return Promise.resolve();
    });

    after(async function () {

        try {
            await Application.deleteApplication(userId, appId);
        } catch (error) {
            console.error('deleteApplication', JSON.stringify(error))
        }

        await User.deleteUser(userId);
        return Promise.resolve();

    });

    it('It should get a list of connections', async function () {
        let connections = await Connection.getConnections(userId, appId);

        expect(connections).to.be.a('object');
        expect(connections).to.have.property('Count').to.be.a('number').to.be.eq(0);
        expect(connections).to.have.property('Items').to.be.a('array');
        return Promise.resolve('OK');
    });

    it('It should create a MYSQL connections', async function () {
        let connectionDetails = {
            name: 'My connection',
            connectorType: 'MYSQL_LIVE',
            host: mysqlData.host,
            'user': mysqlData.user,
            'password': mysqlData.password,
        };

        let connectionItem = await Connection.createConnection(userId, appId, connectionDetails);

        expect(connectionItem).to.be.a('object');
        expect(connectionItem).to.have.property('connectorid').to.be.a('string');
        expect(connectionItem).to.have.property('name').to.be.a('string').to.be.eq(connectionDetails.name);
        expect(connectionItem).to.have.property('connectorType').to.be.a('string').to.be.eq(connectionDetails.connectorType);
        expect(connectionItem).to.have.property('host').to.be.a('string').to.be.eq(connectionDetails.host);
        expect(connectionItem).to.have.property('user').to.be.a('string').to.be.eq(connectionDetails.user);
        expect(connectionItem).to.have.property('appid').to.be.a('string').to.be.eq(appId);
        expect(connectionItem).to.have.property('userid').to.be.a('string').to.be.eq(userId);

        connectionId = connectionItem.connectorid;
        return Promise.resolve('OK');
    });

    it('It should get a list of connections', async function () {
        let connections = await Connection.getConnections(userId, appId);

        expect(connections).to.be.a('object');
        expect(connections).to.have.property('Count').to.be.a('number').to.be.eq(1);
        expect(connections).to.have.property('Items').to.be.a('array');
        return Promise.resolve('OK');
    });

    it('It should get a connection', async function () {
        let connectionItem = await Connection.getConnection(userId, appId, connectionId);

        expect(connectionItem).to.be.a('object');
        expect(connectionItem).to.have.property('connectorid').to.be.a('string').to.be.eq(connectionId);
        expect(connectionItem).to.have.property('appid').to.be.a('string').to.be.eq(appId);
        expect(connectionItem).to.have.property('userid').to.be.a('string').to.be.eq(userId);

        return Promise.resolve('OK');
    });

    it('It should delete a connection', async function () {
        let connectionItem = await Connection.deleteConnection(userId, appId, connectionId);

        expect(connectionItem).to.have.property('connectorid').to.be.a('string').to.be.eq(connectionId);
        expect(connectionItem).to.have.property('appid').to.be.a('string').to.be.eq(appId);
        expect(connectionItem).to.have.property('userid').to.be.a('string').to.be.eq(userId);
        return Promise.resolve('OK');
    });
});