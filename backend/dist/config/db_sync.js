"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_connect_1 = require("./db_connect"); // Külső modul
const User_1 = require("../models/User");
const Category_1 = require("../models/Category");
const Recipe_1 = require("../models/Recipe");
const Ingredient_1 = require("../models/Ingredient");
const db_sync = async () => {
    User_1.User.hasMany(Recipe_1.Recipe, { foreignKey: "user_id", onDelete: "CASCADE" });
    Category_1.Category.hasMany(Recipe_1.Recipe, { foreignKey: "category_id", onDelete: "CASCADE" });
    Ingredient_1.Ingredient.belongsTo(Recipe_1.Recipe, { foreignKey: "recipe_id", onDelete: "CASCADE" });
    Recipe_1.Recipe.belongsTo(User_1.User, { foreignKey: "user_id" });
    Recipe_1.Recipe.belongsTo(Category_1.Category, { foreignKey: "category_id", onDelete: "CASCADE" });
    Recipe_1.Recipe.hasMany(Ingredient_1.Ingredient, { foreignKey: 'recipe_id', onDelete: "CASCADE" });
    db_connect_1.sequelize.sync({ force: true });
};
// Adatbázis szinkronizálása és kapcsolatok létrehozása
db_sync();
