"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const sequelize_1 = require("sequelize");
const db_connect_1 = require("../config/db_connect");
class CategoryModel extends sequelize_1.Model {
}
const Category = CategoryModel.init({
    category_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
}, { sequelize: db_connect_1.sequelize, modelName: "Category" });
exports.Category = Category;
