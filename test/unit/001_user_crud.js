let { expect } = require('chai');
let User = require('../../lib/user');

describe('User: User crud', function () {
    let userId, email = 'alberto.valle+cx001@qrvey.com';

    it('It should create a user', async function () {
        this.timeout(25000);

        let userDetails = {
            email,
            password: 'qrvey123',
        };

        let userItem = await User.createUser(userDetails);
        userId = userItem.userid;


        return Promise.resolve('OK');
    });

    it('It should get a user', async function () {
        let userItem = await User.getUser(userId);

        expect(userItem).to.be.a('object');
        expect(userItem).to.have.property('userid').to.be.a('string').to.be.eq(userId);
        expect(userItem).to.have.property('email').to.be.a('string').to.be.eq(email);

        return Promise.resolve('OK');
    });

    it('It should delete a user', async function () {
        let userItem = await User.deleteUser(userId);
        return Promise.resolve('OK');
    });
});