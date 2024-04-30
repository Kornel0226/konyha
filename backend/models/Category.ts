import { DataType, DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db_connect";
import { Recipe } from "./Recipe";
import { SellableFood } from "./SellableFood";

class CategoryModel extends Model<CategoryAttributes, CategoryCreationAttributes> {
    category_id!: number
    name!: string
    createdAt?: Date;
    updatedAt?: Date;
}

const Category = CategoryModel.init({
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
}, { sequelize, modelName: "Category" })

type CategoryAttributes = {
    category_id: number,
    name: string
    createdAt?: Date;
    updatedAt?: Date;
}





type CategoryCreationAttributes = Optional<CategoryAttributes, "category_id">

export { Category, CategoryAttributes, CategoryCreationAttributes }