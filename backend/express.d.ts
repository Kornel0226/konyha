import { Request } from "express"
import { AuthUser } from "./src/middleware/authentication"

declare module "express" {
    export interface Request {
        user: AuthUser
    }
}

declare module 'express-serve-static-core' {
    export interface Request {
        user: AuthUser
    }
}