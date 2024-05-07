"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getLoggedUser = exports.getUser = void 0;
const User_1 = require("../models/User");
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const internal_server_error_1 = __importDefault(require("../errors/internal-server-error"));
const not_found_1 = __importDefault(require("../errors/not-found"));
const unauthorizedError_1 = __importDefault(require("../errors/unauthorizedError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Userrel kapcsolatos endpointok
// Egy felhasználó lekérése id (user_id) alapjan
const getUser = async (req, res, next) => {
    const { id } = req.params;
    const { fields } = req.query;
    if (!id) {
        return next(new bad_request_1.default("No id provided!"));
    }
    if (isNaN(parseInt(id))) {
        return next(new bad_request_1.default("Not valid id"));
    }
    let requestedFields;
    if (fields && typeof fields === "string") {
        // Get valid properties of UserModel
        const validProperties = Object.keys(User_1.User.getAttributes());
        // Split fields by comma, trim, and filter out invalid fields
        requestedFields = fields.split(',')
            .map((field) => field.trim())
            .filter((field) => validProperties.includes(field) && field !== "password");
    }
    let user;
    if (requestedFields && requestedFields.length === 0) {
        return next(new bad_request_1.default("Not valid fields"));
    }
    try {
        user = await User_1.User.findOne({
            where: { user_id: parseInt(id) },
            attributes: requestedFields ? requestedFields : { exclude: ["password"] },
        });
    }
    catch (error) {
        return next(new internal_server_error_1.default("Server error"));
    }
    if (!user) {
        return next(new not_found_1.default("User not found."));
    }
    res.status(200).json(user);
};
exports.getUser = getUser;
const getLoggedUser = async (req, res, next) => {
    const { fields } = req.query;
    const au = req.user;
    if (!au) {
        return next(new unauthorizedError_1.default("Acces Deined"));
    }
    const id = au.id;
    if (!id) {
        return next(new bad_request_1.default("No id provided!"));
    }
    let requestedFields;
    if (fields && typeof fields === "string") {
        // Get valid properties of UserModel
        const validProperties = Object.keys(User_1.User.getAttributes());
        // Split fields by comma, trim, and filter out invalid fields
        requestedFields = fields.split(',')
            .map((field) => field.trim())
            .filter((field) => validProperties.includes(field) && field !== "password");
    }
    let user;
    if (requestedFields && requestedFields.length === 0) {
        return next(new bad_request_1.default("Not valid fields"));
    }
    try {
        user = await User_1.User.findOne({
            where: { user_id: id },
            attributes: requestedFields ? requestedFields : { exclude: ["password"] },
        });
    }
    catch (error) {
        return next(new internal_server_error_1.default("Server error"));
    }
    if (!user) {
        return next(new not_found_1.default("User not found."));
    }
    res.status(200).json(user);
};
exports.getLoggedUser = getLoggedUser;
// patch user
const updateUser = async (req, res, next) => {
    // by the authenticaiton middleware
    const user = req.user;
    const { fields } = req.body;
    const validProperties = Object.keys(User_1.User.getAttributes());
    if (!user) {
        return next(new unauthorizedError_1.default("Nem vagy bejelentkezve!"));
    }
    let validFields = {};
    for (let key in fields) {
        if (validProperties.includes(key)) {
            validFields[key] = fields[key];
        }
    }
    if (Object.getOwnPropertyNames(validFields).length === 0) {
        return next(new bad_request_1.default("Invalid properties"));
    }
    //hashing
    let hashedPassword = undefined;
    if (validFields.password) {
        try {
            const salt = await bcrypt_1.default.genSalt(10);
            hashedPassword = await bcrypt_1.default.hash(validFields.password, salt);
        }
        catch (error) {
            console.error("Error hashing password:", error);
            return next(new internal_server_error_1.default("Error processing password"));
        }
    }
    if (hashedPassword) {
        validFields.password = hashedPassword;
    }
    let fetchedUser;
    try {
        fetchedUser = await User_1.User.findOne({ where: { user_id: user.id } });
    }
    catch (error) {
        return next(new internal_server_error_1.default("Server Error"));
    }
    1;
    if (!fetchedUser) {
        return next(new bad_request_1.default("User not found."));
    }
    let updates = {};
    for (let key in validFields) {
        if (validFields[key] !== fetchedUser[key]) {
            updates[key] = validFields[key];
        }
    }
    if (Object.getOwnPropertyNames(updates).length === 0) {
        return res.status(202).json({ updated: false });
    }
    try {
        const update = await fetchedUser.update(updates);
        res.status(202).json({ updated: true });
    }
    catch (error) {
        console.error(error);
        return next(new internal_server_error_1.default("Server Error"));
    }
};
exports.updateUser = updateUser;
