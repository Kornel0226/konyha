"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeModel = exports.Recipe = void 0;
const sequelize_1 = require("sequelize");
const db_connect_1 = require("../config/db_connect");
const User_1 = require("./User");
const Category_1 = require("./Category");
class RecipeModel extends sequelize_1.Model {
}
exports.RecipeModel = RecipeModel;
const Recipe = RecipeModel.init({
    recipe_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    image: {
        type: sequelize_1.DataTypes.TEXT
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    preparation_time: {
        type: sequelize_1.DataTypes.INTEGER
    },
    difficulty_level: {
        type: sequelize_1.DataTypes.ENUM("EASY", "MEDIUM", "HARD"),
        allowNull: false
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: User_1.User,
            key: "user_id"
        },
        allowNull: false
    },
    category_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Category_1.Category,
            key: "category_id"
        },
        allowNull: false
    }
}, { sequelize: db_connect_1.sequelize, modelName: "Recipes" });
exports.Recipe = Recipe;
