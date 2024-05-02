import { Router } from "express";
import { createFood, deleteFood, getFoods, updateFood } from "../controllers/food";
import authentication from "../middleware/authentication";
import { getRatings } from "../controllers/foodRating";

const foodRouter = Router();

foodRouter.route("/").get(getFoods).post(authentication, createFood)
foodRouter.route("/:foodId").delete(authentication, deleteFood).patch(authentication, updateFood)
foodRouter.route("/:foodId/ratings").get(getRatings);

export { foodRouter } 