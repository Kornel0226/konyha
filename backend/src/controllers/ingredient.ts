import { RequestHandler } from "express";
import BadRequestError from "../errors/bad-request";
import { Ingredient, IngredientAttributes, IngredientCreationAttributes } from "../models/Ingredient";
import NotFoundError from "../errors/not-found";
import InternalServerError from "../errors/internal-server-error";
import { Recipe } from "../models/Recipe";
import { where } from "sequelize";
import ForbiddenError from "../errors/forbidden-error";
import { AuthUser } from "../middleware/authentication";
import UnauthorizedError from "../errors/unauthorizedError";

const getIngredient: RequestHandler = async (req, res, next) => {
    const { ingredientId } = req.params;

    if (!ingredientId || isNaN(parseInt(ingredientId))) {
        return next(new BadRequestError("Invalid ingredientId provided"))
    }

    try {
        const ingredient = await Ingredient.findOne({ where: { ingredient_id: ingredientId } })

        if (!ingredient) {
            return next(new NotFoundError("Ingredient not found"))
        }
        return res.status(200).json({ ingredient });
    } catch (error) {
        return next(new InternalServerError("Server Error"));
    }
}

const getIngredients: RequestHandler = async (req, res, next) => {
    const { recipeId } = req.params;

    if (!recipeId || isNaN(parseInt(recipeId))) {
        return next(new BadRequestError("Invalid recipeId"));
    }



    try {
        const recipe = await Recipe.findByPk(recipeId)

        if (!recipe) {
            return next(new NotFoundError("Recipe not found"))
        }
        const ingredients = await Ingredient.findAll({ where: { recipe_id: recipeId } });

        if (ingredients.length === 0) {
            return next(new NotFoundError("No ingredients found for the given recipeId."));
        }

        return res.status(200).json(ingredients);
    } catch (error) {
        // Handle database or other internal errors
        console.error("Error retrieving ratings:", error);
        return next(new InternalServerError("Server Error"));
    }
}

const createIngredient: RequestHandler = async (req, res, next) => {
    const { ingredient } = req.body

    const user = req.user as AuthUser

    if (!user) {
        return next(new UnauthorizedError("Acces Deined"));
    }

    if (!ingredient) {
        return next(new BadRequestError("Nem adtál meg hozzávalót."))
    }

    if (!isIngredient(ingredient)) {
        return next(new BadRequestError("Hibás hozzávaló attribútumok"))
    }

    try {
        const recipe = await Recipe.findByPk(ingredient.recipe_id)

        if (!recipe) {
            return next(new NotFoundError("Recipe not found"))
        }

        if (recipe.user_id !== user.id) {
            return next(new ForbiddenError("Access denied!"))
        }

        const createdIngredient = await Ingredient.create(ingredient)

        return res.status(201).json(createdIngredient);
    } catch (error) {
        return next(new InternalServerError("Server Error"));
    }

}



const updateIngredient: RequestHandler = async (req, res, next) => {
    const { ingredientId } = req.params;
    const { fields } = req.body;

    const user = req.user as AuthUser

    if (!user) {
        return next(new UnauthorizedError("Acces Deined"));
    }

    if (!ingredientId || isNaN(parseInt(ingredientId))) {
        return next(new BadRequestError("Invalid ratingId"));
    }

    if (!fields) {
        return next(new BadRequestError("No fields provided to update"));
    }

    const { name, quantity, unit } = fields;

    if (typeof name === "string" && name.length > 0 || typeof name === "undefined") {
        if (typeof quantity === "number" && quantity > 0 || typeof quantity === "undefined") {
            if (typeof unit === "string" && unit.length > 0 || typeof unit === "undefined") {
                const updates: any = { name, quantity, unit };

                try {
                    const foundIngreident = await Ingredient.findOne({ where: { ingredient_id: ingredientId } });

                    if (!foundIngreident) {
                        return next(new NotFoundError("No ingredient exists with id"));
                    }

                    const recipe = await Recipe.findOne({ where: { recipe_id: foundIngreident.recipe_id } })

                    if (recipe && recipe.user_id !== user.id) {
                        return next(new ForbiddenError("Access denied!"));
                    }

                    await foundIngreident.update(updates);
                    res.status(202).json({ status: "updated" });
                } catch (error) {
                    return next(new InternalServerError("Server Error"));
                }
            }
        } else {
            return next(new BadRequestError("Invalid quantity"));
        }
    }
    else {
        return next(new BadRequestError("Invalid unit"))
    }
};

const deleteIngredient: RequestHandler = async (req, res, next) => {
    ;
    const { ingredientId } = req.params;

    const user = req.user as AuthUser

    if (!user) {
        return next(new UnauthorizedError("Acces Deined"));
    }

    if (!ingredientId || isNaN(parseInt(ingredientId))) {
        return next(new BadRequestError("No ingredient id provided."));
    }

    try {
        const ingredient = await Ingredient.findOne({ where: { ingredient_id: ingredientId } });

        if (!ingredient) {
            return next(new BadRequestError("No ingredient found with id"));
        }

        const recipe = await Recipe.findOne({ where: { recipe_id: ingredient.recipe_id } })

        if (recipe && recipe.user_id !== user.id) {
            return next(new ForbiddenError("No access"));
        }

        await ingredient.destroy();
    } catch (error) {
        return next(new InternalServerError("Server Error"));
    }

    return res.status(203).json({ status: "deleted" });
};

export { getIngredients, updateIngredient, deleteIngredient, getIngredient, createIngredient };

function isIngredient(value: any): value is IngredientCreationAttributes {
    return typeof
        value === "object" &&
        "name" in value &&
        "quantity" in value &&
        "unit" in value &&
        "recipe_id" in value
}