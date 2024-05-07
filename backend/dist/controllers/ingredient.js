"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIngredient = exports.getIngredient = exports.deleteIngredient = exports.updateIngredient = exports.getIngredients = void 0;
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const Ingredient_1 = require("../models/Ingredient");
const not_found_1 = __importDefault(require("../errors/not-found"));
const internal_server_error_1 = __importDefault(require("../errors/internal-server-error"));
const Recipe_1 = require("../models/Recipe");
const forbidden_error_1 = __importDefault(require("../errors/forbidden-error"));
const unauthorizedError_1 = __importDefault(require("../errors/unauthorizedError"));
const getIngredient = async (req, res, next) => {
    const { ingredientId } = req.params;
    if (!ingredientId || isNaN(parseInt(ingredientId))) {
        return next(new bad_request_1.default("Invalid ingredientId provided"));
    }
    try {
        const ingredient = await Ingredient_1.Ingredient.findOne({ where: { ingredient_id: ingredientId } });
        if (!ingredient) {
            return next(new not_found_1.default("Ingredient not found"));
        }
        return res.status(200).json({ ingredient });
    }
    catch (error) {
        return next(new internal_server_error_1.default("Server Error"));
    }
};
exports.getIngredient = getIngredient;
const getIngredients = async (req, res, next) => {
    const { recipeId } = req.params;
    if (!recipeId || isNaN(parseInt(recipeId))) {
        return next(new bad_request_1.default("Invalid recipeId"));
    }
    try {
        const recipe = await Recipe_1.Recipe.findByPk(recipeId);
        if (!recipe) {
            return next(new not_found_1.default("Recipe not found"));
        }
        const ingredients = await Ingredient_1.Ingredient.findAll({ where: { recipe_id: recipeId } });
        if (ingredients.length === 0) {
            return next(new not_found_1.default("No ingredients found for the given recipeId."));
        }
        return res.status(200).json(ingredients);
    }
    catch (error) {
        // Handle database or other internal errors
        console.error("Error retrieving ratings:", error);
        return next(new internal_server_error_1.default("Server Error"));
    }
};
exports.getIngredients = getIngredients;
const createIngredient = async (req, res, next) => {
    const { ingredient } = req.body;
    const user = req.user;
    if (!user) {
        return next(new unauthorizedError_1.default("Acces Deined"));
    }
    if (!ingredient) {
        return next(new bad_request_1.default("Nem adtál meg hozzávalót."));
    }
    if (!isIngredient(ingredient)) {
        return next(new bad_request_1.default("Hibás hozzávaló attribútumok"));
    }
    try {
        const recipe = await Recipe_1.Recipe.findByPk(ingredient.recipe_id);
        if (!recipe) {
            return next(new not_found_1.default("Recipe not found"));
        }
        if (recipe.user_id !== user.id) {
            return next(new forbidden_error_1.default("Access denied!"));
        }
        const createdIngredient = await Ingredient_1.Ingredient.create(ingredient);
        return res.status(201).json(createdIngredient);
    }
    catch (error) {
        return next(new internal_server_error_1.default("Server Error"));
    }
};
exports.createIngredient = createIngredient;
const updateIngredient = async (req, res, next) => {
    const { ingredientId } = req.params;
    const { fields } = req.body;
    const user = req.user;
    if (!user) {
        return next(new unauthorizedError_1.default("Acces Deined"));
    }
    if (!ingredientId || isNaN(parseInt(ingredientId))) {
        return next(new bad_request_1.default("Invalid ratingId"));
    }
    if (!fields) {
        return next(new bad_request_1.default("No fields provided to update"));
    }
    const { name, quantity, unit } = fields;
    if (typeof name === "string" && name.length > 0 || typeof name === "undefined") {
        if (typeof quantity === "number" && quantity > 0 || typeof quantity === "undefined") {
            if (typeof unit === "string" && unit.length > 0 || typeof unit === "undefined") {
                const updates = { name, quantity, unit };
                try {
                    const foundIngreident = await Ingredient_1.Ingredient.findOne({ where: { ingredient_id: ingredientId } });
                    if (!foundIngreident) {
                        return next(new not_found_1.default("No ingredient exists with id"));
                    }
                    const recipe = await Recipe_1.Recipe.findOne({ where: { recipe_id: foundIngreident.recipe_id } });
                    if (recipe && recipe.user_id !== user.id) {
                        return next(new forbidden_error_1.default("Access denied!"));
                    }
                    await foundIngreident.update(updates);
                    res.status(202).json({ status: "updated" });
                }
                catch (error) {
                    return next(new internal_server_error_1.default("Server Error"));
                }
            }
        }
        else {
            return next(new bad_request_1.default("Invalid quantity"));
        }
    }
    else {
        return next(new bad_request_1.default("Invalid unit"));
    }
};
exports.updateIngredient = updateIngredient;
const deleteIngredient = async (req, res, next) => {
    ;
    const { ingredientId } = req.params;
    const user = req.user;
    if (!user) {
        return next(new unauthorizedError_1.default("Acces Deined"));
    }
    if (!ingredientId || isNaN(parseInt(ingredientId))) {
        return next(new bad_request_1.default("No ingredient id provided."));
    }
    try {
        const ingredient = await Ingredient_1.Ingredient.findOne({ where: { ingredient_id: ingredientId } });
        if (!ingredient) {
            return next(new bad_request_1.default("No ingredient found with id"));
        }
        const recipe = await Recipe_1.Recipe.findOne({ where: { recipe_id: ingredient.recipe_id } });
        if (recipe && recipe.user_id !== user.id) {
            return next(new forbidden_error_1.default("No access"));
        }
        await ingredient.destroy();
    }
    catch (error) {
        return next(new internal_server_error_1.default("Server Error"));
    }
    return res.status(203).json({ status: "deleted" });
};
exports.deleteIngredient = deleteIngredient;
function isIngredient(value) {
    return typeof value === "object" &&
        "name" in value &&
        "quantity" in value &&
        "unit" in value &&
        "recipe_id" in value;
}
