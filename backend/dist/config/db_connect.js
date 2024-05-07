"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.dbConnect = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const username = process.env.DBUSERNAME;
const database = process.env.DATABASE;
const host = process.env.DBHOST;
if (!username || !database || !host) {
    throw new Error('Hiányzik adatbázishoz szükséges info');
}
const config = {
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
        const sequelize = new sequelize_1.Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
            host: dbConfig.host,
            dialect: dbConfig.dialect
        });
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return sequelize;
    }
    catch (error) {
        throw new Error(`Unable to connect to the database: ${error}`);
    }
};
exports.dbConnect = dbConnect;
const sequelize = new sequelize_1.Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect
});
exports.sequelize = sequelize;
