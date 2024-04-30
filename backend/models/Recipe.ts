import { DataType, DataTypes, INTEGER, Model, Optional, Sequelize } from "sequelize";
import { sequelize } from "../config/db_connect";
import { User } from "./User";
import { Category } from "./Category";
import { Ingredient } from "./Ingredient";
import { Rating } from "./Rating";

class RecipeModel extends Model<RecipeAttributes, RecipeCreationAttributes> {
    recipe_id!: number
    title!: string
    description!: string
    preparation_time?: number
    difficulty_level!: string
    user_id!: number
    category_id!: number
    createdAt?: Date;
    updatedAt?: Date;
}

const Recipe = RecipeModel.init({
    recipe_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    preparation_time: {
        type: DataTypes.INTEGER
    },
    difficulty_level: {
        type: DataTypes.ENUM("EASY", "MEDIUM", "HARD"),
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "user_id"
        },
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: "category_id"
        },
        allowNull: false
    }
}, { sequelize, modelName: "Recipes" })

type RecipeAttributes = {
    recipe_id: number
    title: string
    description: string
    preparation_time: number
    difficulty_level: string
    user_id: number
    category_id: number
    createdAt?: Date;
    updatedAt?: Date;
}

type RecipeCreationAttributes = Optional<RecipeAttributes, "recipe_id">

export { Recipe, RecipeAttributes, RecipeCreationAttributes }