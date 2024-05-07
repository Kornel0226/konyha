import { DataType, DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db_connect";
import { Recipe } from "./Recipe";

class IngredientModel extends Model<IngredientAttributes, IngredientCreationAttributes> {
    ingredient_id!: number
    name!: string
    quantity!: number
    unit!: string
    recipe_id!: number
    createdAt?: Date;
    updatedAt?: Date;
}

const Ingredient = IngredientModel.init({
    ingredient_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    unit: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    recipe_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Recipe,
            key: "recipe_id"
        },
        allowNull: false
    }
}, { sequelize, modelName: "Ingredient" });

type IngredientAttributes = {
    ingredient_id: number
    name: string
    quantity: number
    unit: string
    recipe_id: number
    createdAt?: Date;
    updatedAt?: Date;
}

type IngredientCreationAttributes = Optional<IngredientAttributes, "ingredient_id">

export { Ingredient, IngredientAttributes, IngredientCreationAttributes }