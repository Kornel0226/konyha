import { Router } from "express";
import authentication from "../middleware/authentication";
import { login, register } from "../controllers/auth";
import { getLoggedUser, getUser, updateUser } from "../controllers/user";
import { getUserRecipes } from "../controllers/recipe";

const userRouter = Router()


userRouter.route("/auth").post(login)

userRouter.route("/register").post(register)

userRouter.route("/user").get(authentication, getLoggedUser).patch(authentication, updateUser)

userRouter.route("/user/recipes").get(authentication, getUserRecipes)

userRouter.route("/:id").get(getUser)




export default userRouter;