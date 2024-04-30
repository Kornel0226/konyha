import { Router } from "express";
import authentication from "../middleware/authentication";
import { login, register } from "../controllers/auth";

const userRouter = Router()


userRouter.route("/auth").post(login)

userRouter.route("/register").post(register)


export default userRouter;