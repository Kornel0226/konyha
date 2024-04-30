import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db_connect";
import { Recipe } from "./Recipe";
import { User } from "./User";


class RatingModel extends Model<RatingAttributes, RatingCreationAttributes> {
    rating_id!: number
    rating!: number
    description?: string
    recipe_id!: number
    user_id!: number
    createdAt?: Date;
    updatedAt?: Date;
}

const Rating = RatingModel.init({
    rating_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    recipe_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Recipe,
            key: "recipe_id",
        },
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "user_id"
        },
        allowNull: false
    }
}, { sequelize, modelName: "Ratings" })

type RatingAttributes = {
    rating_id: number
    rating: number
    description: string
    recipe_id: number
    user_id: number
    createdAt?: Date;
    updatedAt?: Date;
}

type RatingCreationAttributes = Optional<RatingAttributes, "rating_id">

export { Rating, RatingAttributes, RatingCreationAttributes }