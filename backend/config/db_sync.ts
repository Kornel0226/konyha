import { sequelize } from "./db_connect";  // Külső modul
import { User } from "../models/User";
import { Admin } from "../models/Admin";
import { Category } from "../models/Category";
import { Recipe } from "../models/Recipe";
import { Ingredient } from "../models/Ingredient";
import { Rating } from "../models/Rating";
import { SellableFood } from "../models/SellableFood";
import { SellableFoodRating } from "../models/SellableFoodRating";



const db_sync = async () => {

    User.hasMany(Recipe, { foreignKey: "user_id", onDelete: "CASCADE" });
    User.hasMany(SellableFood, { foreignKey: "user_id", onDelete: "CASCADE" });
    //User.hasMany(Rating, { as: "ratingUser", foreignKey: "user_id" });
    Rating.belongsTo(User, { foreignKey: "user_id" })
    Rating.belongsTo(Recipe, { foreignKey: "recipe_id", onDelete: "CASCADE" })
    Recipe.hasMany(Rating, { foreignKey: 'recipe_id', onDelete: "CASCADE" })
    //User.hasMany(SellableFoodRating, { foreignKey: "user_id", onDelete: "CASCADE" });
    SellableFoodRating.belongsTo(User, { foreignKey: "user_id" })
    SellableFoodRating.belongsTo(SellableFood, { foreignKey: "food_id", onDelete: "CASCADE" })
    SellableFood.belongsTo(User, { foreignKey: "user_id" })
    SellableFood.belongsTo(Category, { foreignKey: "category_id", onDelete: "CASCADE" })
    Category.hasMany(Recipe, { foreignKey: "category_id", onDelete: "CASCADE" });
    Category.hasMany(SellableFood, { foreignKey: "category_id", onDelete: "CASCADE" });
    Ingredient.belongsTo(Recipe, { foreignKey: "recipe_id", onDelete: "CASCADE" });
    Recipe.belongsTo(User, { foreignKey: "user_id" })
    Recipe.belongsTo(Category, { foreignKey: "category_id", onDelete: "CASCADE" })
    Recipe.hasMany(Ingredient, { foreignKey: 'recipe_id', onDelete: "CASCADE" });
    SellableFood.hasMany(SellableFoodRating, { foreignKey: "food_id", onDelete: "CASCADE" })
    Admin.belongsTo(User, { foreignKey: "user_id" })



    sequelize.sync({ force: true })

}
// Adatbázis szinkronizálása és kapcsolatok létrehozása
db_sync();