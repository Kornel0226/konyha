import { Router } from "express";
import authentication from "../middleware/authentication";
import { login, register } from "../controllers/auth";
import { getUser } from "../controllers/user";

const userRouter = Router()


userRouter.route("/auth").post(login)

userRouter.route("/register").post(register)

userRouter.route("/:id").get(getUser);


export default userRouter;