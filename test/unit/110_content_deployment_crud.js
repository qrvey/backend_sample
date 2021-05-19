let { expect } = require('chai');
let Admin = require('../../lib/admin');
let ContentDeployment = require('../../lib/contentDeployment');

describe('CD1.0: Content deployment crud', function () {

    const RELEASE_NAME = 'CX - CD1.0 test';
    let adminToken, releaseId, releaseDetails;

    it('It should generate an admin login token', async function () {

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
        let releases = await ContentDeployment.getReleases(adminToken);

        expect(releases).to.be.a('object');
        expect(releases).to.have.property('Count').to.be.a('number');
        expect(releases).to.have.property('Items').to.be.a('array');
        return Promise.resolve('OK');
    });

    it('It should get create a release', async function () {

        let adminRelease = {
            name: RELEASE_NAME,
        }
        let releaseItem = await ContentDeployment.createRelease({ adminRelease }, adminToken);

        expect(releaseItem).to.be.a('object');
        expect(releaseItem).to.have.property('adminreleaseid').to.be.a('string');
        expect(releaseItem).to.have.property('name').to.be.a('string').eq(RELEASE_NAME);

        releaseId = releaseItem.adminreleaseid;
        releaseDetails = {...releaseItem};
        return Promise.resolve('OK');
    });

    it('It should get update a release', async function () {

        let adminRelease = {
            ...releaseDetails,
            app: {
                content: {
                    datasets: [
                        {
                            qrveyid: 'XCMwbk1PL',
                        }
                    ]
                },
                server: {
                    apiKey: process.env.API_KEY,
                    host: process.env.DOMAIN,
                    adminserverid: 'HJr01ogpN',
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
                    users: [
                        {
                            userid: 'd9WLKWa',
                            autoinstall: true,
                            action: 'new',
                            app_id: '',
                            isDeploy: true,
                            lockUser: false,
                            app_name: 'CX - POC 2',
                        }
                    ]
                }
            ]
        }
        let releaseItem = await ContentDeployment.updateRelease(releaseId, { adminRelease }, adminToken);
    
        expect(releaseItem).to.be.a('object');
        expect(releaseItem).to.have.property('adminreleaseid').to.be.a('string').to.be.eq(releaseId);
        expect(releaseItem).to.have.property('name').to.be.a('string').eq(RELEASE_NAME);
        releaseDetails = {...releaseItem};
    
        return Promise.resolve('OK');
    });

    it('It should delete a release', async function () {
        
        let releaseItem = await ContentDeployment.delete(releaseId, adminToken);

        expect(releaseItem).to.be.a('object');
        expect(releaseItem).to.have.property('status').to.be.a('boolean').to.be.eq(true);
        
        return Promise.resolve('OK');
    });

});