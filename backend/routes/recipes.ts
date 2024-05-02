import { Router } from "express";
import { createRecipe, deleteRecipe, getRecipe, getRecipes, updateRecipe } from "../controllers/recipe";
import authentication from "../middleware/authentication";
import { getRatings } from "../controllers/recipeRating";
import { getIngredients } from "../controllers/ingredient";

const recipeRouter = Router()


recipeRouter.route("/").get(getRecipes);
recipeRouter.route("/add").post(authentication, createRecipe);
recipeRouter.route("/:recipeId").get(getRecipe).delete(authentication, deleteRecipe).patch(authentication, updateRecipe);
recipeRouter.route("/:recipeId/ratings").get(getRatings);
recipeRouter.route("/:recipeId/ingredients").get(getIngredients);

export { recipeRouter }