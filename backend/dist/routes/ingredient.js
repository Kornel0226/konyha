"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middleware/authentication"));
const ingredient_1 = require("../controllers/ingredient");
const ingredientRouter = (0, express_1.Router)();
ingredientRouter.route("/").post(authentication_1.default, ingredient_1.createIngredient);
ingredientRouter.route("/:ingredientId").get(ingredient_1.getIngredient).patch(authentication_1.default, ingredient_1.updateIngredient).delete(authentication_1.default, ingredient_1.deleteIngredient);
exports.default = ingredientRouter;
