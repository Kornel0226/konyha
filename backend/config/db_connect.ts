import { Sequelize } from "sequelize";

type DBConfig = {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: 'mssql' | 'mysql' | 'postgres' | 'sqlite'; // Add other valid dialects as needed
}

const config: {
    development: DBConfig;
    production: DBConfig;
} = {
    "development": {
        "username": "Admin",
        "password": "2002jan26",
        "database": "KozossegiKonyha",
        "host": "localhost",
        "dialect": "mssql"
    },
    "production": {
        "username": "your_production_username",
        "password": "your_production_password",
        "database": "your_production_database",
        "host": "your_production_host",
        "dialect": "mssql"
    }
};

const dbConfig = config.development

const dbConnect = async () => {
    try {
        const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
            host: dbConfig.host,
            dialect: dbConfig.dialect
        });
        await sequelize.authenticate();
        return sequelize;
    } catch (error) {
        throw error;
    }
}

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect
});

export { dbConnect, sequelize };

