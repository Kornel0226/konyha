"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingredient = void 0;
const sequelize_1 = require("sequelize");
const db_connect_1 = require("../config/db_connect");
const Recipe_1 = require("./Recipe");
class IngredientModel extends sequelize_1.Model {
}
const Ingredient = IngredientModel.init({
    ingredient_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    unit: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    recipe_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Recipe_1.Recipe,
            key: "recipe_id"
        },
        allowNull: false
    }
}, { sequelize: db_connect_1.sequelize, modelName: "Ingredient" });
exports.Ingredient = Ingredient;
