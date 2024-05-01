import { Router } from "express";
import { createRecipe, getRecipes } from "../controllers/recipe";
import authentication from "../middleware/authentication";

const recipeRouter = Router()


recipeRouter.route("/").get(getRecipes);
recipeRouter.route("/add").post(authentication,createRecipe);

export { recipeRouter }