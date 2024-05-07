"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDb = void 0;
const Admin_1 = require("../models/Admin");
const Category_1 = require("../models/Category");
const Ingredient_1 = require("../models/Ingredient");
const Rating_1 = require("../models/Rating");
const Recipe_1 = require("../models/Recipe");
const SellableFood_1 = require("../models/SellableFood");
const SellableFoodRating_1 = require("../models/SellableFoodRating");
const User_1 = require("../models/User");
const seedDb = async () => {
    try {
        await User_1.User.bulkCreate([
            { username: "admin", email: "admin@dev.com", password: "admin", is_admin: true },
            { username: "user1", email: "user1@example.com", password: "user1example" },
            { username: "user2", email: "user3@example.com", password: "user4example" }
        ]);
        await Category_1.Category.bulkCreate([
            { name: "Leves" },
            { name: "Desszert" }
        ]);
        await Recipe_1.Recipe.bulkCreate([
            { title: "Torta", description: "exampleexampleexample", preparation_time: 60, difficulty_level: "EASY", user_id: 2, category_id: 2 },
            { title: "Gulyás", description: "exampleexampleexample", preparation_time: 60, difficulty_level: "MEDIUM", user_id: 3, category_id: 1 }
        ]);
        await Ingredient_1.Ingredient.bulkCreate([
            { name: "Cukor", unit: "12g", quantity: 1, recipe_id: 1 },
            { name: "Só", unit: "1g", quantity: 2, recipe_id: 1 },
            { name: "Répa", unit: "12g", quantity: 1, recipe_id: 2 },
            { name: "Hús", unit: "10g", quantity: 2, recipe_id: 2 }
        ]);
        await Rating_1.Rating.bulkCreate([
            { user_id: 2, recipe_id: 1, rating: 5, description: "asdasdasd" },
            { user_id: 3, recipe_id: 2, rating: 2, description: "asdasdasd" }
        ]);
        await SellableFood_1.SellableFood.bulkCreate([
            { user_id: 2, title: "sajt torta", description: "123xd123", price: 10000, category_id: 1 },
            { user_id: 3, title: "eper torta", description: "123xd123", price: 10000, category_id: 2 }
        ]);
        await SellableFoodRating_1.SellableFoodRating.bulkCreate([
            { user_id: 2, food_id: 1, rating: 2, description: "111dfffjjj" },
            { user_id: 3, food_id: 2, rating: 4, description: "111dfffjjj" }
        ]);
        await Admin_1.Admin.bulkCreate([
            { user_id: 1 }
        ]);
    }
    catch (error) {
        console.log(error);
    }
};
exports.seedDb = seedDb;
(0, exports.seedDb)();
