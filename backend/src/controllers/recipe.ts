import { RequestHandler } from "express";
import { Recipe, RecipeAttributes, RecipeCreationAttributes, RecipeModel } from "../models/Recipe";
import BadRequestError from "../errors/bad-request";
import InternalServerError from "../errors/internal-server-error";
import { compareSync } from "bcrypt";
import ForbiddenError from "../errors/forbidden-error";
import { Op, where } from "sequelize";
import NotFoundError from "../errors/not-found";
import multer from "multer";
import { AuthUser } from "../middleware/authentication";
import UnauthorizedError from "../errors/unauthorizedError";
import { Ingredient } from "../models/Ingredient";
import * as fs from "fs"

const getRecipe: RequestHandler = async (req, res, next) => {
    const { recipeId } = req.params;

    if (!recipeId || isNaN(parseInt(recipeId))) {
        return next(new BadRequestError("Invalid recipeId provided"))
    }

    try {
        const recipe = await Recipe.findOne({ where: { recipe_id: recipeId } })
        return res.status(200).json({ recipe });
    } catch (error) {
        return next(new InternalServerError("Server Error"));
    }
}


const getRecipes: RequestHandler = async (req, res, next) => {
    const { fields, prep_min, prep_max, ...filters } = req.query;
    const validProperties = Object.keys(Recipe.getAttributes());



    // Check if no fields or filters are provided
    if (!fields && Object.keys(filters).length === 0 && !prep_min && !prep_max) {
        try {
            const recipes = await Recipe.findAll();
            return res.status(200).json({ recipes });
        } catch (error) {
            return next(new InternalServerError("Server Error"));
        }
    }

    if (prep_min && prep_max) {
        if (typeof prep_min !== "string" || isNaN(parseInt(prep_min))) {
            return next(new BadRequestError("prep_min-nek számnak kell lennie!"))
        }

        if (typeof prep_max !== "string" || isNaN(parseInt(prep_max))) {
            return next(new BadRequestError("prep_min-nek számnak kell lennie!"))
        }
    }

    if (prep_min) {
        if (typeof prep_min !== "string" || isNaN(parseInt(prep_min))) {
            return next(new BadRequestError("prep_min-nek számnak kell lennie!"))
        }
    }
    if (prep_max) {
        if (typeof prep_max !== "string" || isNaN(parseInt(prep_max))) {
            return next(new BadRequestError("prep_min-nek számnak kell lennie!"))
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


    // Define where clause for prep_time range
    let whereClause = {};

    if (prep_min && prep_max) {
        whereClause = {
            ...whereClause,
            preparation_time: {
                [Op.gte]: parseInt(prep_min),
                [Op.lte]: parseInt(prep_max)
            }
        };
    } else if (prep_min) {
        whereClause = {
            ...whereClause,
            preparation_time: {
                [Op.gte]: parseInt(prep_min)
            }
        };
    } else if (prep_max) {
        whereClause = {
            ...whereClause,
            preparation_time: {
                [Op.lte]: parseInt(prep_max)
            }
        };
    }

    // Process filters and retrieve recipes
    try {
        const recipes = await Recipe.findAll({ where: { ...filters, ...whereClause }, attributes: requestedFields.length > 0 ? requestedFields : undefined });
        return res.status(200).json({ recipes });
    } catch (error) {
        console.error(error);
        return next(new InternalServerError("Server Error"));

    }
};




const getUserRecipes: RequestHandler = async (req, res, next) => {
    const { fields, ...filters } = req.query;
    const validProperties = Object.keys(RecipeModel.getAttributes()); // Adjust if needed

    const user = req.user as AuthUser

    if (!user) {
        return next(new UnauthorizedError("Acces Deined"));
    }

    try {
        let recipes: RecipeModel[]; // Use RecipeModel directly

        // If no fields or filters are provided, fetch all recipes for the user
        if (!fields && Object.keys(filters).length === 0) {
            recipes = await RecipeModel.findAll({ where: { user_id: user.id } });
        } else {
            // Process requested fields
            const requestedFields: string[] = [];
            if (fields && typeof fields === "string") {
                // Split fields by comma, trim, and filter out invalid fields
                requestedFields.push(
                    ...fields.split(',')
                        .map((field: string) => field.trim())
                        .filter((field) => validProperties.includes(field))
                );

                if (requestedFields.length === 0) {
                    throw new BadRequestError("Invalid fields!");
                }
            } else if (fields) {
                throw new BadRequestError("Invalid fields!");
            }

            // Check for invalid filters
            const invalidFilters = Object.entries(filters).filter(([key, value]) => !validProperties.includes(key) || value === "");
            if (invalidFilters.length > 0) {
                const invalidFilterNames = invalidFilters.map(([key]) => key).join(", ");
                throw new BadRequestError(`Invalid filter(s): ${invalidFilterNames}`);
            }

            // Fetch recipes based on filters and requested fields
            recipes = await RecipeModel.findAll({
                where: { ...filters, user_id: user.id },
                attributes: requestedFields.length > 0 ? requestedFields : undefined
            });
        }



        return res.status(200).json({ recipes: recipes })
    } catch (error) {
        return next(new InternalServerError("Server Error"));
    }
};




const createRecipe: RequestHandler = async (req, res, next) => {


    const user = req.user as AuthUser

    let path;
    if (req.file) {
        path = req.file.path
    }

    if (!user) {
        return next(new UnauthorizedError("Acces Deined"));
    }


    const recipe: RecipeCreationAttributes = {
        title: req.body.title,
        preparation_time: req.body.preparation_time,
        difficulty_level: req.body.difficulty_level,
        category_id: req.body.category_id,
        description: req.body.description,
        user_id: user.id
    }

    let ingredients;
    try {
        ingredients = JSON.parse(req.body.ingredients)
    } catch (error) {
        return next(new BadRequestError("Hibás hozzávlók"))
    }



    if (!Array.isArray(ingredients)) {
        return next(new BadRequestError("Ingredients must be an array"))
    }

    ingredients.forEach((ingredient) => {
        if (!ingredient.name || ingredient.name === '') {
            return new BadRequestError("Hozzávaló neve nem lehet ures!")
        }
        if (!ingredient.quantity || ingredient.quantity < 1) {
            return new BadRequestError("A hozzávalók mennyiségének legalább 1-nek kell lennie!")
        }
    })


    if (!recipe) {
        return next(new BadRequestError("Nem adtál meg receptet."))
    }

    let imageUrl: string | undefined = undefined;

    if (path) {
        imageUrl = path
    }

    if (imageUrl) {
        recipe.image = imageUrl
    }



    try {
        const createdRecipe = await Recipe.create(recipe)

        const modifiedIngredients = ingredients.map(ingredient => { return { ...ingredient, recipe_id: createdRecipe.recipe_id } })

        await Ingredient.bulkCreate(modifiedIngredients)

        return res.status(201)
    } catch (error) {
        console.error(error)
        return next(new InternalServerError("Szerver hiba"));
    }

}

const deleteRecipe: RequestHandler = async (req, res, next) => {

    const { recipeId } = req.params

    const user = req.user as AuthUser

    if (!user) {
        return next(new UnauthorizedError("Acces Deined"));
    }

    if (!recipeId || isNaN(parseInt(recipeId))) {
        return next(new BadRequestError("No recipe id provided."))
    }

    try {
        const recipe = await Recipe.findOne({ where: { recipe_id: recipeId } })

        if (recipe) {
            if (recipe.user_id !== user.id) {
                return next(new ForbiddenError("No access"))
            } else {
                await recipe.destroy()
                if (recipe.image) {
                    fs.unlinkSync(recipe.image)
                }
            }
        } else {
            return next(new BadRequestError("No recipe found with id"))
        }

        return res.status(204).json({ status: "deleted" })

    } catch (error) {
        return next(new InternalServerError("Server Error"))
    }
}

const updateRecipe: RequestHandler = async (req, res, next) => {
    const { recipeId } = req.params;;
    const user = req.user as AuthUser;

    let path;
    if (req.file) {
        path = req.file.path;
    }

    if (!user) {
        return next(new UnauthorizedError("Access Denied"));
    }

    try {
        const recipeToPatch = await Recipe.findOne({ where: { recipe_id: recipeId } });

        if (!recipeToPatch) {
            return next(new BadRequestError("No recipe found with id"));
        }

        if (recipeToPatch.user_id !== user.id) {
            return next(new ForbiddenError("No access"));
        }

        const { title = recipeToPatch.title, preparation_time = recipeToPatch.preparation_time, difficulty_level = recipeToPatch.difficulty_level, category_id = recipeToPatch.category_id, description = recipeToPatch.description }: any = req.body;




        if (!title || !preparation_time || !difficulty_level || !category_id || !description) {
            return next(new BadRequestError("Invalid request body"));
        }

        console.log(req.body);

        const parsedIngredients = JSON.parse(req.body.ingredients);

        if (!Array.isArray(parsedIngredients)) {
            return next(new BadRequestError("Ingredients must be an array"));
        }

        const validProperties = Object.keys(recipeToPatch.toJSON());
        const validFields: any = {};
        const invalidFields: any = {};

        for (const key in req.body) {
            if (key !== "ingredients") {
                if (validProperties.includes(key)) {
                    validFields[key] = req.body[key];
                } else {
                    invalidFields[key] = req.body[key];
                }
            }
        }


        if (Object.getOwnPropertyNames(invalidFields).length >= 1) {
            return next(new BadRequestError(`Invalid fields: ${Object.keys(invalidFields).join(", ")}`));

        }


        if (Object.getOwnPropertyNames(validFields).length !== 0) {
            if (path && recipeToPatch.image) {
                // Delete the previous image
                fs.unlinkSync(recipeToPatch.image);
            }

            // Update the validFields object with the new image path
            if (path) {
                validFields.image = path;
            }
            try {
                console.log(parsedIngredients)
                await recipeToPatch.update(validFields);

                // Delete existing ingredients and create new ones

                const modifiedIngredients = parsedIngredients.map(ingredient => {
                    return {
                        name: ingredient.name as string, quantity: parseInt(ingredient.quantity) as number,
                        unit: ingredient.unit as string, recipe_id: recipeToPatch.recipe_id
                    }
                })


                await Ingredient.destroy({ where: { recipe_id: recipeId } });
                await Ingredient.bulkCreate(modifiedIngredients)

                return res.status(202).json({ status: "updated" });
            } catch (error) {
                return next(new InternalServerError("Server Error"));
            }
        }

        return res.status(202).json({ status: "no changes" });
    } catch (error) {
        return next(new InternalServerError("Server Error"));
    }
};





export { getRecipes, createRecipe, deleteRecipe, updateRecipe, getRecipe, getUserRecipes }

function isRecipe(value: any): value is RecipeCreationAttributes {
    return typeof
        value === "object" &&
        "title" in value &&
        "description" in value &&
        "preparation_time" in value &&
        "difficulty_level" in value &&
        "user_id" in value &&
        "category_id" in value &&
        (value.image === null || value.image === undefined)
}

type Recipe = {
    title?: string
    preparation_time?: string
    difficulty_level?: string
    category_id?: number
    description?: string
    image?: string
}