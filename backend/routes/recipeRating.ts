import { Router } from "express";
import { createRating, deleteRating, getRating, updateRating } from "../controllers/recipeRating";
import authentication from "../middleware/authentication";

const recipeRatingRouter = Router();
recipeRatingRouter.route("/").post(authentication, createRating)
recipeRatingRouter.route("/:ratingId").get(getRating).patch(authentication, updateRating).delete(authentication, deleteRating);

export default recipeRatingRouter;