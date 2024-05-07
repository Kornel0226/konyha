"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_1 = require("../controllers/category");
const categoryRouter = (0, express_1.Router)();
categoryRouter.route("/").get(category_1.getCategories);
categoryRouter.route("/add").post(category_1.createCategory);
categoryRouter.route("/:categoryId").get(category_1.getCategory);
exports.default = categoryRouter;
