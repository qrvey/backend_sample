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

const postgresData = {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    port: process.env.POSTGRES_PORT,
    password: process.env.POSTGRES_PASSWORD,
    databases: {
        demo: {
            tableName: process.env.POSTGRES_TABLE_NAME,
            tableKey: process.env.POSTGRES_TABLE_KEY,
            tableSchema: process.env.POSTGRES_TABLE_SCHEMA,
            databaseName: process.env.POSTGRES_DATABASE_NAME,
        }
    }
};

module.exports = {
    mysqlData,
    postgresData,
};