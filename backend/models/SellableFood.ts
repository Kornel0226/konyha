import { DataType, DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelize } from "../config/db_connect";
import { User } from "./User";
import { SellableFoodRating } from "./SellableFoodRating";
import { Category } from "./Category";

class SellableFoodModel extends Model<SellabeFoodAttributes, SellableFoodCreationAttributes> {
    food_id!: number
    title!: string
    description!: string
    price?: number
    user_id!: number;
    category_id!: number
    createdAt?: Date;
    updatedAt?: Date;
}

const SellableFood = SellableFoodModel.init({
    food_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2)
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
}, { sequelize, modelName: "SellabeFoods", indexes: [{ unique: true, fields: ['title', 'user_id'] }] })


type SellabeFoodAttributes = {
    food_id: number
    category_id: number
    title: string
    description: string
    price: number
    user_id: number
    createdAt?: Date;
    updatedAt?: Date;
}


type SellableFoodCreationAttributes = Optional<SellabeFoodAttributes, "food_id">

export { SellableFood, SellabeFoodAttributes, SellableFoodCreationAttributes }