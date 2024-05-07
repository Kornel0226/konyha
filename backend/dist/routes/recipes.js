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
exports.recipeRouter = void 0;
const express_1 = require("express");
const recipe_1 = require("../controllers/recipe");
const authentication_1 = __importDefault(require("../middleware/authentication"));
const ingredient_1 = require("../controllers/ingredient");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        let destinationFolder;
        if (file.fieldname === 'foodImage') {
            destinationFolder = 'uploads/foods/';
        }
        else if (file.fieldname === 'recipeImage') {
            destinationFolder = 'uploads/recipes/';
        }
        else if (file.fieldname === 'userPicture') {
            destinationFolder = 'uploads/userpictures/';
        }
        else {
            // Default destination if fieldname doesn't match any known type
            destinationFolder = 'uploads/others/';
        }
        // Create the directory if it doesn't exist
        fs.mkdirSync(destinationFolder, { recursive: true });
        cb(null, destinationFolder);
    },
    filename: function (req, file, cb) {
        // Rename file to avoid conflicts
        cb(null, Date.now() + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const recipeRouter = (0, express_1.Router)();
exports.recipeRouter = recipeRouter;
recipeRouter.route("/").get(recipe_1.getRecipes);
const upload = (0, multer_1.default)({ storage });
recipeRouter.route("/add").post(authentication_1.default, upload.single('recipeImage'), recipe_1.createRecipe);
recipeRouter.route("/:recipeId").get(recipe_1.getRecipe).delete(authentication_1.default, recipe_1.deleteRecipe).patch(authentication_1.default, upload.single('recipeImage'), recipe_1.updateRecipe);
recipeRouter.route("/:recipeId/ingredients").get(ingredient_1.getIngredients);
