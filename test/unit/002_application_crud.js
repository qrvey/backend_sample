let { expect } = require('chai');
let User = require('../../lib/user');
let Application = require('../../lib/application');

describe('Application: Application crud', function () {
    let userId, appId,
        email = 'alberto.valle+cx002@qrvey.com',
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
        return Promise.resolve();
    });

    after(async function () {
        await User.deleteUser(userId);
        return Promise.resolve();

    });

    it('It should create an application', async function () {

        let applicationDetails = {
            name: appName,
            description: appDescription,
        };

        let appItem = await Application.createApplication(userId, applicationDetails);

        expect(appItem).to.be.a('object');
        expect(appItem).to.have.property('appid').to.be.a('string');
        expect(appItem).to.have.property('userid').to.be.a('string').to.be.eq(userId);
        expect(appItem).to.have.property('name').to.be.a('string').to.be.eq(appName);
        expect(appItem).to.have.property('description').to.be.a('string').to.be.eq(appDescription);

        appId = appItem.appid;

        return Promise.resolve('OK');
    });

    it('It should get an application', async function () {
        let appItem = await Application.getApplication(userId, appId);

        expect(appItem).to.be.a('object');
        expect(appItem).to.have.property('endUserLink').to.be.a('string');
        expect(appItem).to.have.property('appid').to.be.a('string').to.be.eq(appId);
        expect(appItem).to.have.property('userid').to.be.a('string').to.be.eq(userId);
        expect(appItem).to.have.property('name').to.be.a('string').to.be.eq(appName);
        expect(appItem).to.have.property('description').to.be.a('string').to.be.eq(appDescription);

        return Promise.resolve('OK');
    });

    it('It should delete an application', async function () {
        let appItem = await Application.deleteApplication(userId, appId);
        return Promise.resolve('OK');
    });
});