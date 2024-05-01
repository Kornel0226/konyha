import { RequestHandler } from "express";
import { Recipe } from "../models/Recipe";
import BadRequestError from "../errors/bad-request";
import InternalServerError from "../errors/internal-server-error";
import { compareSync } from "bcrypt";

const getRecipes: RequestHandler = async (req, res, next) => {
    const { fields, ...filters } = req.query;
    const validProperties = Object.keys(Recipe.getAttributes());

    console.log(filters);

    // Check if no fields or filters are provided
    if (!fields && Object.keys(filters).length === 0) {
        try {
            const recipes = await Recipe.findAll();
            return res.status(200).json({ recipes: recipes });
        } catch (error) {
            return next(new InternalServerError("Server Error"));
        }
    }

    // Process requested fields
    let requestedFields: string[] = [];
    if (fields && typeof fields === "string") {
        // Split fields by comma, trim, and filter out invalid fields
        requestedFields = fields.split(',')
            .map((field: string) => field.trim())
            .filter((field) => validProperties.includes(field));

        if (requestedFields.length === 0) {
            return next(new BadRequestError("Invalid fields!"));
        }
    } else if (fields) {
        return next(new BadRequestError("Invalid fields!"));
    }

    // Check for invalid filters
    const invalidFilters = Object.entries(filters).filter(([key, value]) => !validProperties.includes(key) || value === "");
    if (invalidFilters.length > 0) {
        const invalidFilterNames = invalidFilters.map(([key]) => key).join(", ");
        return next(new BadRequestError(`Invalid filter(s): ${invalidFilterNames}`));
    }

    // Check if no filters are provided
    if (Object.keys(filters).length === 0) {
        try {
            const recipes = await Recipe.findAll({ attributes: requestedFields });
            return res.status(200).json({ recipes: recipes });
        } catch (error) {
            return next(new InternalServerError("Server Error"));
        }
    }

    // Process filters and retrieve recipes
    try {
        console.log(requestedFields);
        const recipes = await Recipe.findAll({ where: filters, attributes: requestedFields.length > 0 ? requestedFields : undefined });
        return res.status(200).json({ recipes: recipes });
    } catch (error) {
        return next(new InternalServerError("Server Error"));
    }
};
export { getRecipes }