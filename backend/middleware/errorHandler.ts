import { ErrorRequestHandler } from "express";
import CustomAPIError from "../errors/custom-error";

const errorhandler: ErrorRequestHandler = async (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error"

    if (err instanceof CustomAPIError) {
        statusCode = err.statusCode
        message = JSON.parse(err.message)
    }

    res.status(statusCode).json({ error: message })
}

export default errorhandler;