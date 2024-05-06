import { Router } from "express";
import { createCategory, getCategories, getCategory } from "../controllers/category";

const categoryRouter = Router();

categoryRouter.route("/").get(getCategories);
categoryRouter.route("/add").post(createCategory);
categoryRouter.route("/:categoryId").get(getCategory);

export default categoryRouter