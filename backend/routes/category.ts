import { Router } from "express";
import { createCategory, getCategories } from "../controllers/category";

const categoryRouter = Router();

categoryRouter.route("/").get(getCategories);
categoryRouter.route("/add").post(createCategory);

export default categoryRouter