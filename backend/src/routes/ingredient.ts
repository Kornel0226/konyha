import { Router } from "express"
import authentication from "../middleware/authentication"
import { createIngredient, deleteIngredient, getIngredient, updateIngredient } from "../controllers/ingredient"

const ingredientRouter = Router()

ingredientRouter.route("/").post(authentication, createIngredient)
ingredientRouter.route("/:ingredientId").get(getIngredient).patch(authentication, updateIngredient).delete(authentication, deleteIngredient);

export default ingredientRouter