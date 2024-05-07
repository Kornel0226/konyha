"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelizeErrorHandler = (err, req, res, next) => {
    if (err instanceof sequelize_1.ValidationError) {
        // Handle Sequelize validation errors
        const errors = err.errors.map(error => ({ field: error.path, message: error.message }));
        res.status(400).json({ errors });
    }
    else {
        // Pass other errors to the next error handling middleware
        next(err);
    }
};
exports.default = sequelizeErrorHandler;
