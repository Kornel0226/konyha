import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config()
type DBConfig = {
    username: string;
    password?: string; // Include password field for production
    database: string;
    host: string;
    dialect: 'mysql'; // MySQL dialect
}


const username = process.env.DBUSERNAME
const database = process.env.DATABASE
const host = process.env.DBHOST

if( !username || !database || !host){
    throw new Error('Hiányzik adatbázishoz szükséges info')
}

const config: {
    development: DBConfig;
    production: DBConfig;
} = {
    "development": {
        "username": username,
        "database": database,
        "host": host,
        "dialect": "mysql"
    },
    "production": {
        "username": "your_production_username",
        "password": "your_production_password",
        "database": "your_production_database",
        "host": "your_production_host",
        "dialect": "mysql" // Use MySQL dialect for production as well
    }
};

const dbConfig = config.development;

const dbConnect = async () => {
    try {
        const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
            host: dbConfig.host,
            dialect: dbConfig.dialect
        });
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return sequelize;
    } catch (error) {
        throw new Error(`Unable to connect to the database: ${error}`);
    }
}

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect
});

export { dbConnect, sequelize };
