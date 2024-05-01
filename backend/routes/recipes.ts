import { Router } from "express";
import { getRecipes } from "../controllers/recipe";

const recipeRouter = Router()


recipeRouter.route("/").get(getRecipes);

export { recipeRouter }