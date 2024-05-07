import { ErrorRequestHandler, NextFunction } from "express";
import CustomAPIError from "../errors/custom-error";
import { ValidationError } from "sequelize";

const sequelizeErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        // Handle Sequelize validation errors
        const errors = err.errors.map(error => ({ field: error.path, message: error.message }));
        res.status(400).json({ errors });
    } else {
        // Pass other errors to the next error handling middleware
        next(err);
    }
};

export default sequelizeErrorHandler;