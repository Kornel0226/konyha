import { Router } from "express";
import authentication from "../middleware/authentication";
import { createRating, deleteRating, getRating, updateRating } from "../controllers/foodRating";

const foodRatingRouter = Router();

foodRatingRouter.route("/").post(authentication, createRating)

foodRatingRouter.route("/:ratingId").get(getRating).patch(authentication, updateRating).delete(authentication, deleteRating);

export default foodRatingRouter