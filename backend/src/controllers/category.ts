import { RequestHandler } from "express";
import BadRequestError from "../errors/bad-request";
import { Category } from "../models/Category";
import InternalServerError from "../errors/internal-server-error";
import { where } from "sequelize";
import NotFoundError from "../errors/not-found";

const createCategory: RequestHandler = async (req, res, next) => {
    const { name } = req.body

    if (!name) {
        return next(new BadRequestError("Nem adtad meg a name paramétert!"))
    }

    try {
        const category = await Category.create({ name })
    } catch (error) {
        return next(new InternalServerError("Szerver hiba"))
    }

    res.status(201).json({ status: "created" });
}

const getCategories: RequestHandler = async (req, res, next) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({ categories })
    } catch (error) {
        return next(new InternalServerError("Szerver hiba"));
    }
}

const getCategory: RequestHandler = async (req, res, next) => {
    const { categoryId } = req.params
    console.log(categoryId);

    if (!categoryId) {
        return next(new BadRequestError("Nem adtál meg categoryId-t"))
    }

    if (isNaN(parseInt(categoryId))) {
        return next(new BadRequestError("categoryId-nak számnak kell lennie"))
    }

    try {
        const category = await Category.findByPk(parseInt(categoryId));

        if (!category) {
            return next(new NotFoundError("Nincs kategória ezzel az id-val"))
        }
        res.status(200).json({ category })
    } catch (error) {
        return next(new InternalServerError("Szerver hiba"));
    }
}

export { createCategory, getCategories, getCategory }