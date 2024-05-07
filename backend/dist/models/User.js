"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.User = void 0;
const sequelize_1 = require("sequelize");
const db_connect_1 = require("../config/db_connect");
class UserModel extends sequelize_1.Model {
}
exports.UserModel = UserModel;
const User = UserModel.init({
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING(50),
        unique: true,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    profile_picture: {
        type: sequelize_1.DataTypes.BLOB
    },
    is_admin: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize: db_connect_1.sequelize,
    modelName: 'Users',
});
exports.User = User;
