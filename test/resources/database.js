const mysqlData = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    databases: {
        demo: {
            tableName: 'airlines',
            databaseName: 'Demo',
        }
    }
};

module.exports = {
    mysqlData,
};