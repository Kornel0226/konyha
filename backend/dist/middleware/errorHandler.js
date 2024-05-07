"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const custom_error_1 = __importDefault(require("../errors/custom-error"));
const errorhandler = async (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";
    if (err instanceof custom_error_1.default) {
        statusCode = err.statusCode;
        try {
            message = JSON.parse(err.message);
            res.status(statusCode).json({ error: message });
        }
        catch (error) {
            if (err.message) {
                message = err.message;
            }
            res.status(statusCode).json({ error: message });
        }
    }
};
exports.default = errorhandler;
