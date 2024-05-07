"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserRecipes = exports.getRecipe = exports.updateRecipe = exports.deleteRecipe = exports.createRecipe = exports.getRecipes = void 0;
const Recipe_1 = require("../models/Recipe");
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const internal_server_error_1 = __importDefault(require("../errors/internal-server-error"));
const forbidden_error_1 = __importDefault(require("../errors/forbidden-error"));
const sequelize_1 = require("sequelize");
const unauthorizedError_1 = __importDefault(require("../errors/unauthorizedError"));
const Ingredient_1 = require("../models/Ingredient");
const fs = __importStar(require("fs"));
const getRecipe = async (req, res, next) => {
    const { recipeId } = req.params;
    if (!recipeId || isNaN(parseInt(recipeId))) {
        return next(new bad_request_1.default("Invalid recipeId provided"));
    }
    try {
        const recipe = await Recipe_1.Recipe.findOne({ where: { recipe_id: recipeId } });
        return res.status(200).json({ recipe });
    }
    catch (error) {
        return next(new internal_server_error_1.default("Server Error"));
    }
};
exports.getRecipe = getRecipe;
const getRecipes = async (req, res, next) => {
    const { fields, prep_min, prep_max, ...filters } = req.query;
    const validProperties = Object.keys(Recipe_1.Recipe.getAttributes());
    // Check if no fields or filters are provided
    if (!fields && Object.keys(filters).length === 0 && !prep_min && !prep_max) {
        try {
            const recipes = await Recipe_1.Recipe.findAll();
            return res.status(200).json({ recipes });
        }
        catch (error) {
            return next(new internal_server_error_1.default("Server Error"));
        }
    }
    if (prep_min && prep_max) {
        if (typeof prep_min !== "string" || isNaN(parseInt(prep_min))) {
            return next(new bad_request_1.default("prep_min-nek számnak kell lennie!"));
        }
        if (typeof prep_max !== "string" || isNaN(parseInt(prep_max))) {
            return next(new bad_request_1.default("prep_min-nek számnak kell lennie!"));
        }
    }
    if (prep_min) {
        if (typeof prep_min !== "string" || isNaN(parseInt(prep_min))) {
            return next(new bad_request_1.default("prep_min-nek számnak kell lennie!"));
        }
    }
    if (prep_max) {
        if (typeof prep_max !== "string" || isNaN(parseInt(prep_max))) {
            return next(new bad_request_1.default("prep_min-nek számnak kell lennie!"));
        }
    }
    // Process requested fields
    let requestedFields = [];
    if (fields && typeof fields === "string") {
        // Split fields by comma, trim, and filter out invalid fields
        requestedFields = fields.split(',')
            .map((field) => field.trim())
            .filter((field) => validProperties.includes(field));
        if (requestedFields.length === 0) {
            return next(new bad_request_1.default("Invalid fields!"));
        }
    }
    else if (fields) {
        return next(new bad_request_1.default("Invalid fields!"));
    }
    // Check for invalid filters
    const invalidFilters = Object.entries(filters).filter(([key, value]) => !validProperties.includes(key) || value === "");
    if (invalidFilters.length > 0) {
        const invalidFilterNames = invalidFilters.map(([key]) => key).join(", ");
        return next(new bad_request_1.default(`Invalid filter(s): ${invalidFilterNames}`));
    }
    // Define where clause for prep_time range
    let whereClause = {};
    if (prep_min && prep_max) {
        whereClause = {
            ...whereClause,
            preparation_time: {
                [sequelize_1.Op.gte]: parseInt(prep_min),
                [sequelize_1.Op.lte]: parseInt(prep_max)
            }
        };
    }
    else if (prep_min) {
        whereClause = {
            ...whereClause,
            preparation_time: {
                [sequelize_1.Op.gte]: parseInt(prep_min)
            }
        };
    }
    else if (prep_max) {
        whereClause = {
            ...whereClause,
            preparation_time: {
                [sequelize_1.Op.lte]: parseInt(prep_max)
            }
        };
    }
    // Process filters and retrieve recipes
    try {
        const recipes = await Recipe_1.Recipe.findAll({ where: { ...filters, ...whereClause }, attributes: requestedFields.length > 0 ? requestedFields : undefined });
        return res.status(200).json({ recipes });
    }
    catch (error) {
        console.error(error);
        return next(new internal_server_error_1.default("Server Error"));
    }
};
exports.getRecipes = getRecipes;
const getUserRecipes = async (req, res, next) => {
    const { fields, ...filters } = req.query;
    const validProperties = Object.keys(Recipe_1.RecipeModel.getAttributes()); // Adjust if needed
    const user = req.user;
    if (!user) {
        return next(new unauthorizedError_1.default("Acces Deined"));
    }
    try {
        let recipes; // Use RecipeModel directly
        // If no fields or filters are provided, fetch all recipes for the user
        if (!fields && Object.keys(filters).length === 0) {
            recipes = await Recipe_1.RecipeModel.findAll({ where: { user_id: user.id } });
        }
        else {
            // Process requested fields
            const requestedFields = [];
            if (fields && typeof fields === "string") {
                // Split fields by comma, trim, and filter out invalid fields
                requestedFields.push(...fields.split(',')
                    .map((field) => field.trim())
                    .filter((field) => validProperties.includes(field)));
                if (requestedFields.length === 0) {
                    throw new bad_request_1.default("Invalid fields!");
                }
            }
            else if (fields) {
                throw new bad_request_1.default("Invalid fields!");
            }
            // Check for invalid filters
            const invalidFilters = Object.entries(filters).filter(([key, value]) => !validProperties.includes(key) || value === "");
            if (invalidFilters.length > 0) {
                const invalidFilterNames = invalidFilters.map(([key]) => key).join(", ");
                throw new bad_request_1.default(`Invalid filter(s): ${invalidFilterNames}`);
            }
            // Fetch recipes based on filters and requested fields
            recipes = await Recipe_1.RecipeModel.findAll({
                where: { ...filters, user_id: user.id },
                attributes: requestedFields.length > 0 ? requestedFields : undefined
            });
        }
        return res.status(200).json({ recipes: recipes });
    }
    catch (error) {
        return next(new internal_server_error_1.default("Server Error"));
    }
};
exports.getUserRecipes = getUserRecipes;
const createRecipe = async (req, res, next) => {
    const user = req.user;
    let path;
    if (req.file) {
        path = req.file.path;
    }
    if (!user) {
        return next(new unauthorizedError_1.default("Acces Deined"));
    }
    const recipe = {
        title: req.body.title,
        preparation_time: req.body.preparation_time,
        difficulty_level: req.body.difficulty_level,
        category_id: req.body.category_id,
        description: req.body.description,
        user_id: user.id
    };
    let ingredients;
    try {
        ingredients = JSON.parse(req.body.ingredients);
    }
    catch (error) {
        return next(new bad_request_1.default("Hibás hozzávlók"));
    }
    if (!Array.isArray(ingredients)) {
        return next(new bad_request_1.default("Ingredients must be an array"));
    }
    ingredients.forEach((ingredient) => {
        if (!ingredient.name || ingredient.name === '') {
            return new bad_request_1.default("Hozzávaló neve nem lehet ures!");
        }
        if (!ingredient.quantity || ingredient.quantity < 1) {
            return new bad_request_1.default("A hozzávalók mennyiségének legalább 1-nek kell lennie!");
        }
    });
    if (!recipe) {
        return next(new bad_request_1.default("Nem adtál meg receptet."));
    }
    let imageUrl = undefined;
    if (path) {
        imageUrl = path;
    }
    if (imageUrl) {
        recipe.image = imageUrl;
    }
    try {
        const createdRecipe = await Recipe_1.Recipe.create(recipe);
        const modifiedIngredients = ingredients.map(ingredient => { return { ...ingredient, recipe_id: createdRecipe.recipe_id }; });
        await Ingredient_1.Ingredient.bulkCreate(modifiedIngredients);
        return res.status(201);
    }
    catch (error) {
        console.error(error);
        return next(new internal_server_error_1.default("Szerver hiba"));
    }
};
exports.createRecipe = createRecipe;
const deleteRecipe = async (req, res, next) => {
    const { recipeId } = req.params;
    const user = req.user;
    if (!user) {
        return next(new unauthorizedError_1.default("Acces Deined"));
    }
    if (!recipeId || isNaN(parseInt(recipeId))) {
        return next(new bad_request_1.default("No recipe id provided."));
    }
    try {
        const recipe = await Recipe_1.Recipe.findOne({ where: { recipe_id: recipeId } });
        if (recipe) {
            if (recipe.user_id !== user.id) {
                return next(new forbidden_error_1.default("No access"));
            }
            else {
                await recipe.destroy();
                if (recipe.image) {
                    fs.unlinkSync(recipe.image);
                }
            }
        }
        else {
            return next(new bad_request_1.default("No recipe found with id"));
        }
        return res.status(204).json({ status: "deleted" });
    }
    catch (error) {
        return next(new internal_server_error_1.default("Server Error"));
    }
};
exports.deleteRecipe = deleteRecipe;
const updateRecipe = async (req, res, next) => {
    const { recipeId } = req.params;
    ;
    const user = req.user;
    let path;
    if (req.file) {
        path = req.file.path;
    }
    if (!user) {
        return next(new unauthorizedError_1.default("Access Denied"));
    }
    try {
        const recipeToPatch = await Recipe_1.Recipe.findOne({ where: { recipe_id: recipeId } });
        if (!recipeToPatch) {
            return next(new bad_request_1.default("No recipe found with id"));
        }
        if (recipeToPatch.user_id !== user.id) {
            return next(new forbidden_error_1.default("No access"));
        }
        const { title = recipeToPatch.title, preparation_time = recipeToPatch.preparation_time, difficulty_level = recipeToPatch.difficulty_level, category_id = recipeToPatch.category_id, description = recipeToPatch.description } = req.body;
        if (!title || !preparation_time || !difficulty_level || !category_id || !description) {
            return next(new bad_request_1.default("Invalid request body"));
        }
        console.log(req.body);
        const parsedIngredients = JSON.parse(req.body.ingredients);
        if (!Array.isArray(parsedIngredients)) {
            return next(new bad_request_1.default("Ingredients must be an array"));
        }
        const validProperties = Object.keys(recipeToPatch.toJSON());
        const validFields = {};
        const invalidFields = {};
        for (const key in req.body) {
            if (key !== "ingredients") {
                if (validProperties.includes(key)) {
                    validFields[key] = req.body[key];
                }
                else {
                    invalidFields[key] = req.body[key];
                }
            }
        }
        if (Object.getOwnPropertyNames(invalidFields).length >= 1) {
            return next(new bad_request_1.default(`Invalid fields: ${Object.keys(invalidFields).join(", ")}`));
        }
        if (Object.getOwnPropertyNames(validFields).length !== 0) {
            if (path && recipeToPatch.image) {
                // Delete the previous image
                fs.unlinkSync(recipeToPatch.image);
            }
            // Update the validFields object with the new image path
            if (path) {
                validFields.image = path;
            }
            try {
                console.log(parsedIngredients);
                await recipeToPatch.update(validFields);
                // Delete existing ingredients and create new ones
                const modifiedIngredients = parsedIngredients.map(ingredient => {
                    return {
                        name: ingredient.name, quantity: parseInt(ingredient.quantity),
                        unit: ingredient.unit, recipe_id: recipeToPatch.recipe_id
                    };
                });
                await Ingredient_1.Ingredient.destroy({ where: { recipe_id: recipeId } });
                await Ingredient_1.Ingredient.bulkCreate(modifiedIngredients);
                return res.status(202).json({ status: "updated" });
            }
            catch (error) {
                return next(new internal_server_error_1.default("Server Error"));
            }
        }
        return res.status(202).json({ status: "no changes" });
    }
    catch (error) {
        return next(new internal_server_error_1.default("Server Error"));
    }
};
exports.updateRecipe = updateRecipe;
function isRecipe(value) {
    return typeof value === "object" &&
        "title" in value &&
        "description" in value &&
        "preparation_time" in value &&
        "difficulty_level" in value &&
        "user_id" in value &&
        "category_id" in value &&
        (value.image === null || value.image === undefined);
}
