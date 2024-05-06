import { sequelize } from "./db_connect";  // Külső modul
import { User } from "../models/User";
import { Category } from "../models/Category";
import { Recipe } from "../models/Recipe";
import { Ingredient } from "../models/Ingredient";




const db_sync = async () => {

    User.hasMany(Recipe, { foreignKey: "user_id", onDelete: "CASCADE" });
    Category.hasMany(Recipe, { foreignKey: "category_id", onDelete: "CASCADE" });
    Ingredient.belongsTo(Recipe, { foreignKey: "recipe_id", onDelete: "CASCADE" });
    Recipe.belongsTo(User, { foreignKey: "user_id" })
    Recipe.belongsTo(Category, { foreignKey: "category_id", onDelete: "CASCADE" })
    Recipe.hasMany(Ingredient, { foreignKey: 'recipe_id', onDelete: "CASCADE" });



    sequelize.sync({ force: true })

}
// Adatbázis szinkronizálása és kapcsolatok létrehozása
db_sync();