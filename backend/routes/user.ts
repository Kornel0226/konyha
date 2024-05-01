import { Router } from "express";
import authentication from "../middleware/authentication";
import { login, register } from "../controllers/auth";
import { getLoggedUser, getUser, updateUser } from "../controllers/user";

const userRouter = Router()


userRouter.route("/auth").post(login)

userRouter.route("/register").post(register)

userRouter.route("/user").get(authentication, getLoggedUser)

userRouter.route("/:id").get(getUser).patch(authentication, updateUser)



export default userRouter;