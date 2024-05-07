"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategory = exports.getCategories = exports.createCategory = void 0;
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const Category_1 = require("../models/Category");
const internal_server_error_1 = __importDefault(require("../errors/internal-server-error"));
const not_found_1 = __importDefault(require("../errors/not-found"));
const createCategory = async (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return next(new bad_request_1.default("Nem adtad meg a name paramétert!"));
    }
    try {
        const category = await Category_1.Category.create({ name });
    }
    catch (error) {
        return next(new internal_server_error_1.default("Szerver hiba"));
    }
    res.status(201).json({ status: "created" });
};
exports.createCategory = createCategory;
const getCategories = async (req, res, next) => {
    try {
        const categories = await Category_1.Category.findAll();
        res.status(200).json({ categories });
    }
    catch (error) {
        return next(new internal_server_error_1.default("Szerver hiba"));
    }
};
exports.getCategories = getCategories;
const getCategory = async (req, res, next) => {
    const { categoryId } = req.params;
    console.log(categoryId);
    if (!categoryId) {
        return next(new bad_request_1.default("Nem adtál meg categoryId-t"));
    }
    if (isNaN(parseInt(categoryId))) {
        return next(new bad_request_1.default("categoryId-nak számnak kell lennie"));
    }
    try {
        const category = await Category_1.Category.findByPk(parseInt(categoryId));
        if (!category) {
            return next(new not_found_1.default("Nincs kategória ezzel az id-val"));
        }
        res.status(200).json({ category });
    }
    catch (error) {
        return next(new internal_server_error_1.default("Szerver hiba"));
    }
};
exports.getCategory = getCategory;
