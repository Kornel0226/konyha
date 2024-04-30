import { RequestHandler } from "express"
import UnauthorizedError from "../errors/unauthorizedError";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import InternalServerError from '../errors/internal-server-error';

const authentication: RequestHandler = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ") !){
        return next(new UnauthorizedError("Not logged in!"))
    }

    const token = authHeader.split(" ")[1]

    const secret = process.env.JWT_SECRET

    if (!secret){
        return next(new InternalServerError("Opss, something unexpected happened."))
    }

    let decodedToken: JwtPayload | string;
    try {
        decodedToken = jwt.verify(token, secret)     
    } catch (error) {
        return next(new UnauthorizedError("You have bo access!"))
    }

    if (!isJwtPayload(decodedToken)){
        return next(new UnauthorizedError("You have no access!"))
    }

    const {id, username} = decodedToken

    if (!id || !username) {
        return next(new UnauthorizedError("You have no access!"))
    }

    req.body.user = {
        id, username
    }

    next();
}
export default authentication;

// Custom type guard function
function isJwtPayload(token: JwtPayload | string): token is JwtPayload {
    return typeof token !== 'string';
}