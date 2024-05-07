"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../middleware/authentication"));
const auth_1 = require("../controllers/auth");
const user_1 = require("../controllers/user");
const recipe_1 = require("../controllers/recipe");
const userRouter = (0, express_1.Router)();
userRouter.route("/auth").post(auth_1.login);
userRouter.route("/register").post(auth_1.register);
userRouter.route("/user").get(authentication_1.default, user_1.getLoggedUser).patch(authentication_1.default, user_1.updateUser);
userRouter.route("/user/recipes").get(authentication_1.default, recipe_1.getUserRecipes);
userRouter.route("/:id").get(user_1.getUser);
exports.default = userRouter;
