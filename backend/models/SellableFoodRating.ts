import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db_connect";
import { User } from "./User";
import { SellableFood } from "./SellableFood";

class SellableFoodRatingModel extends Model<SellableFoodRatingAttributes, SellableFoodRatingCreationAttributes> {
    rating_id!: number
    rating!: number
    description?: string
    user_id!: number
    food_id!: number
    createdAt?: Date;
    updatedAt?: Date;
}

const SellableFoodRating = SellableFoodRatingModel.init({
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
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "user_id"
        },
        allowNull: false,
    },
    food_id: {
        type: DataTypes.INTEGER,
        references: {
            model: SellableFood,
            key: "food_id"
        },
        allowNull: false,
    }
}, { sequelize, modelName: "SellableFoodRatings" })


type SellableFoodRatingAttributes = {
    rating_id: number
    rating: number
    description: string
    user_id: number
    food_id: number
    createdAt?: Date;
    updatedAt?: Date;
}

type SellableFoodRatingCreationAttributes = Optional<SellableFoodRatingAttributes, "rating_id">

export { SellableFoodRating, SellableFoodRatingAttributes, SellableFoodRatingCreationAttributes }