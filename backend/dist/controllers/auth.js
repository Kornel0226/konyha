"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = require("../models/User");
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const internal_server_error_1 = __importDefault(require("../errors/internal-server-error"));
const sequelize_1 = require("sequelize");
const validations_1 = require("../util/validations");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    const validationErrors = [];
    // Check if required fields are missing
    if (!email) {
        validationErrors.push({ field: "email", error: "No email provided" });
    }
    if (!username) {
        validationErrors.push({ field: "username", error: "No username provided" });
    }
    if (!password) {
        validationErrors.push({ field: "password", error: "No password provided" });
    }
    // Validate email, username, and password format
    if (email && !(0, validations_1.isValidEmail)(email)) {
        validationErrors.push({ field: "email", error: "Incorrect email format" });
    }
    if (username && !(0, validations_1.isValidUserName)(username)) {
        validationErrors.push({ field: "username", error: "Incorrect username format" });
    }
    if (password && !(0, validations_1.isValidPassword)(password)) {
        validationErrors.push({ field: "password", error: "Incorrect password format" });
    }
    // If there are any validation errors, return them
    if (validationErrors.length > 0) {
        const validationErrorsString = JSON.stringify(validationErrors);
        return next(new bad_request_1.default(validationErrorsString));
    }
    //hashing
    let hashedPassword;
    try {
        const salt = await bcrypt_1.default.genSalt(10);
        hashedPassword = await bcrypt_1.default.hash(password, salt);
    }
    catch (error) {
        console.error("Error hashing password:", error);
        return next(new internal_server_error_1.default("Error processing password"));
    }
    // If no validation errors, proceed with creating the user
    const newUser = {
        username: username,
        email: email,
        password: hashedPassword
    };
    try {
        await User_1.User.create(newUser);
        // Send a 201 Created status code and a response message
        res.status(201).send("User created successfully");
    }
    catch (error) {
        console.error("Error during user creation", error);
        if (error instanceof sequelize_1.ValidationError) {
            // Extract validation error messages
            const validationErrors = error.errors.map((err) => ({ field: err.path, error: err.message }));
            const validationErrorsString = JSON.stringify(validationErrors);
            return next(new bad_request_1.default(validationErrorsString));
        }
        return next(new internal_server_error_1.default("An unexpected error has occurred"));
    }
};
exports.register = register;
const login = async (req, res, next) => {
    const { email, password } = req.body;
    const validationErrors = [];
    if (!email) {
        validationErrors.push({ email: "No email provided" });
    }
    if (!password) {
        validationErrors.push({ password: "No password provided" });
    }
    if (email && !(0, validations_1.isValidEmail)(email)) {
        validationErrors.push({ email: "Invalid email!" });
    }
    if (password && !(0, validations_1.isValidPassword)(password)) {
        validationErrors.push({ password: "Invalid password!" });
    }
    if (validationErrors.length > 0) {
        const validationErrorsString = JSON.stringify(validationErrors);
        return next(new bad_request_1.default(validationErrorsString));
    }
    const user = await User_1.User.findOne({ where: { email: email } });
    if (!user) {
        return next(new bad_request_1.default(JSON.stringify({ email: "No user with email" })));
    }
    const isPasswordCorrect = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordCorrect) {
        return next(new bad_request_1.default(JSON.stringify({ password: "Wrong password" })));
    }
    const jwtSecret = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign({ id: user.user_id, username: user.username }, jwtSecret, { expiresIn: "1d" });
    res.json({ token: token, username: user.username });
};
exports.login = login;
