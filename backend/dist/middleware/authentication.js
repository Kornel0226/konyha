"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unauthorizedError_1 = __importDefault(require("../errors/unauthorizedError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const internal_server_error_1 = __importDefault(require("../errors/internal-server-error"));
const authentication = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new unauthorizedError_1.default("Not logged in!"));
    }
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return next(new internal_server_error_1.default("Opss, something unexpected happened."));
    }
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        return next(new unauthorizedError_1.default("You have bo access!"));
    }
    if (!isJwtPayload(decodedToken)) {
        return next(new unauthorizedError_1.default("You have no access!"));
    }
    const { id, username } = decodedToken;
    if (!id || !username) {
        return next(new unauthorizedError_1.default("You have no access!"));
    }
    req.user = {
        id, username
    };
    next();
};
exports.default = authentication;
// Custom type guard function
function isJwtPayload(token) {
    return typeof token !== 'string';
}
