let { expect } = require('chai');
let { postgresData } = require('../resources/database');
const { nanoid } = require('nanoid');
const _ = require('lodash');
let Admin = require('../../lib/admin');
let ContentDeployment = require('../../lib/contentDeployment');

describe('CD1.0: Content deployment crud', function () {

    const RELEASE_NAME = 'CX - CD1.0 test', ADMIN_SERVER_ID = process.env.ADMIN_SERVER_ID, REPLACEMENT_NAME = `CX replacement ${nanoid(8)}`;
    let adminToken, releaseId, releaseDetails, replacementId;

    it('It should generate an admin login token', async function () {
        this.timeout(6000);

        let data = {
            accessKey: process.env.USER_ACCESS_KEY,
            username: process.env.ADMIN_USER_NAME,
        };

        let item = await Admin.login(data);

        expect(item).to.be.a('object');
        expect(item).to.have.property('token').to.be.a('string')
        expect(item).to.have.property('status').to.be.a('boolean').to.be.eq(true);


        adminToken = `jwt ${item.token}`;
        return Promise.resolve('OK');
    });

    it('It should get a list of releases', async function () {
        this.timeout(6000);
        let releases = await ContentDeployment.getReleases(adminToken);

        expect(releases).to.be.a('object');
        expect(releases).to.have.property('Count').to.be.a('number');
        expect(releases).to.have.property('Items').to.be.a('array');

        return Promise.resolve('OK');
    });

    it('It create a new replacement', async function () {
        this.timeout(10000);

        let replacementDetails = {
            type: 'postgres',
            name: REPLACEMENT_NAME,
            host: postgresData.host,
            user: postgresData.user,
            password: postgresData.password,
            database: postgresData.databases.demo.databaseName,
            tableSchema: postgresData.databases.demo.tableSchema,
            table: postgresData.databases.demo.tableName,
            isEncrypted: false,
        };

        let data = await Admin.createReplacement(ADMIN_SERVER_ID, replacementDetails, adminToken);

        expect(data).to.have.property('status').to.be.a('boolean').to.be.eq(true);
        return Promise.resolve('OK');
    });

    it('Get replacement by name', async function () {
        this.timeout(10000);

        let data = await Admin.getServer(ADMIN_SERVER_ID, adminToken);

        expect(data).to.have.property('replacements').to.be.a('object');
        expect(data.replacements).to.have.property('postgres').to.be.a('array');

        let replacement = _.find(data.replacements.postgres, { name: REPLACEMENT_NAME });

        expect(replacement).to.be.a('object');
        expect(replacement).to.have.property('name').to.be.a('string').to.be.eq(REPLACEMENT_NAME);
        expect(replacement).to.have.property('id').to.be.a('string');

        replacementId = replacement.id;
        return Promise.resolve('OK');
    });

    it('It should get create a release', async function () {
        this.timeout(6000);
        let adminRelease = {
            name: RELEASE_NAME,
        }
        let releaseItem = await ContentDeployment.createRelease({ adminRelease }, adminToken);

        expect(releaseItem).to.be.a('object');
        expect(releaseItem).to.have.property('adminreleaseid').to.be.a('string');
        expect(releaseItem).to.have.property('name').to.be.a('string').eq(RELEASE_NAME);

        releaseId = releaseItem.adminreleaseid;
        releaseDetails = { ...releaseItem };
        return Promise.resolve('OK');
    });

    it('It should update a release', async function () {
        this.timeout(6000);
        let adminRelease = {
            ...releaseDetails,
            app: {
                appId: "WAOOiyFzX",
                userId: "d9WLKWa",
                content: {
                    datasets: [
                        {
                            qrveyid: 'MdlwsF0LZ',
                        }
                    ]
                },
                server: {
                    apiKey: process.env.API_KEY,
                    host: process.env.DOMAIN,
                    adminserverid: 'HJr01ogpN',
                    serverName: 'Qrvey QA',
                },
            },
            servers: [
                {
                    adminserverid: 'HJr01ogpN',
                    autoinstall: false,
                    defaultReplacements: false,
                    lockApplicationContent: false,
                    lockBlock: false,
                    blockId: 'block_1',
                    serverName: 'Qrvey QA',
                    users: [
                        {
                            userid: 'd9WLKWa',
                            autoinstall: true,
                            action: 'new',
                            app_id: '',
                            isDeploy: true,
                            lockUser: false,
                            app_name: 'CX - POC 2',
                            replacements: [
                                {
                                    name: REPLACEMENT_NAME,
                                    qrveyid: 'MdlwsF0LZ',
                                    replacementeId: replacementId,
                                    type: 'postgres'
                                }
                            ],
                        }
                    ]
                }
            ]
        }
        let releaseItem = await ContentDeployment.updateRelease(releaseId, { adminRelease }, adminToken);

        expect(releaseItem).to.be.a('object');
        expect(releaseItem).to.have.property('adminreleaseid').to.be.a('string').to.be.eq(releaseId);
        expect(releaseItem).to.have.property('name').to.be.a('string').eq(RELEASE_NAME);
        releaseDetails = { ...releaseItem };

        return Promise.resolve('OK');
    });

    // it('It should deploy a release', async function () {
    //     this.timeout(6000);

    //     let data = await ContentDeployment.deploy(releaseId, adminToken);

    //     expect(data).to.be.a('object');
    //     expect(data).to.have.property('status').to.be.a('boolean').to.be.eq(true);

    //     return Promise.resolve('OK');
    // });

    it('It should delete a release', async function () {
        this.timeout(6000);
        let releaseItem = await ContentDeployment.delete(releaseId, adminToken);

        expect(releaseItem).to.be.a('object');
        expect(releaseItem).to.have.property('status').to.be.a('boolean').to.be.eq(true);

        return Promise.resolve('OK');
    });

    it('Delete replacement by id', async function () {
        this.timeout(10000);

        let data = await Admin.deleteReplacement(ADMIN_SERVER_ID, replacementId, 'postgres', adminToken);

        expect(data).to.have.property('status').to.be.a('boolean').to.be.eq(true);
        return Promise.resolve('OK');
    });

});