let { expect } = require('chai');
let User = require('../../lib/user');

describe('User: User crud', function () {
    let userId, email = 'alberto.valle+cx001@qrvey.com';

    it('It should create a user', async function () {
        this.timeout(25000);

        console.log('MYSQL_HOST', process.env.MYSQL_HOST);
        console.log('MYSQL_USER', process.env.MYSQL_USER);
        console.log('MYSQL_PASSWORD', process.env.MYSQL_PASSWORD);
        console.log('MYSQL_TABLE_NAME', process.env.MYSQL_TABLE_NAME);
        console.log('MYSQL_DATABASE_NAME', process.env.MYSQL_DATABASE_NAME);
        console.log('DOMAIN', process.env.DOMAIN);
        console.log('API_KEY', process.env.API_KEY);
        
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