let { expect } = require('chai');
let Admin = require('../../lib/admin');

describe('User: User crud', function () {

    it('It should generate a admin login token', async function () {

        let data = {
            accessKey: process.env.USER_ACCESS_KEY,
            username: process.env.ADMIN_USER_NAME,
        };

        let item = await Admin.login(data);

        expect(item).to.be.a('object');
        expect(item).to.have.property('token').to.be.a('string')
        expect(item).to.have.property('status').to.be.a('boolean').to.be.eq(true);


        return Promise.resolve('OK');
    });

});