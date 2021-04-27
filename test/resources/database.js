const mysqlData = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    databases: {
        demo: {
            tableName: process.env.MYSQL_TABLE_NAME,
            databaseName: process.env.MYSQL_DATABASE_NAME,
        }
    }
};

module.exports = {
    mysqlData,
};