import { RequestHandler } from "express";
import BadRequestError from "../errors/bad-request";
import InternalServerError from "../errors/internal-server-error";
import { SellabeFoodAttributes, SellableFood, SellableFoodModel } from "../models/SellableFood";
import ForbiddenError from "../errors/forbidden-error";

const getFoods: RequestHandler = async (req, res, next) => {
    const { fields, ...filters } = req.query;
    const validProperties = Object.keys(SellableFood.getAttributes());

    console.log(filters);

    // Check if no fields or filters are provided
    if (!fields && Object.keys(filters).length === 0) {
        try {
            const recipes = await SellableFood.findAll();
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
            const recipes = await SellableFood.findAll({ attributes: requestedFields });
            return res.status(200).json({ recipes: recipes });
        } catch (error) {
            return next(new InternalServerError("Server Error"));
        }
    }

    // Process filters and retrieve recipes
    try {
        console.log(requestedFields);
        const recipes = await SellableFood.findAll({ where: filters, attributes: requestedFields.length > 0 ? requestedFields : undefined });
        return res.status(200).json({ recipes: recipes });
    } catch (error) {
        return next(new InternalServerError("Server Error"));
    }
};

const createFood: RequestHandler = async (req, res, next) => {
    const { food, user } = req.body

    if (!food) {
        return next(new BadRequestError("Nem adtál meg ételt."))
    }

    food.user_id = user.id

    if (!isFood(food)) {
        return next(new BadRequestError("Hibás étel attribútumok"))
    }

    try {
        const createdFood = await SellableFood.create(food)
        res.status(201).json({ created: createdFood })
    } catch (error) {
        console.error(error)
        return next(new InternalServerError("Szerver hiba"));
    }

}

const deleteFood: RequestHandler = async (req, res, next) => {
    const { user } = req.body
    const { foodId } = req.params

    if (!foodId || isNaN(parseInt(foodId))) {
        return next(new BadRequestError("No recipe id provided."))
    }

    try {
        const food = await SellableFood.findOne({ where: { food_id: foodId } })

        if (food) {
            if (food.user_id !== user.id) {
                return next(new ForbiddenError("No access"))
            } else {
                await food.destroy()
            }
        } else {
            return next(new BadRequestError("No recipe found with id"))
        }

        return res.status(204).json({ status: "deleted" })

    } catch (error) {
        return next(new InternalServerError("Server Error"))
    }
}

const updateFood: RequestHandler = async (req, res, next) => {
    const { user } = req.body
    const { foodId } = req.params
    const { fields } = req.body

    if (!foodId || isNaN(parseInt(foodId))) {
        return next(new BadRequestError("Invalid foodId."))
    }

    if (!fields) {
        return next(new BadRequestError("No fields sent to update"))
    }

    let food: SellableFoodModel | null;

    try {
        food = await SellableFood.findOne({ where: { food_id: foodId } })

        if (food) {
            if (food.user_id !== user.id) {
                return next(new ForbiddenError("No access"))
            }
        } else {
            return next(new BadRequestError("No food found with id"))
        }
    } catch (error) {
        return next(new InternalServerError("Server Error"))
    }

    if (!food) {
        return next(new InternalServerError("Server Error"))
    }

    const validProperties = Object.keys(SellableFood.getAttributes());
    let validFields: any = {};
    let invalidFields: any = {};

    for (let key in fields) {
        if (validProperties.includes(key)) {
            validFields[key] = fields[key];
        } else {
            invalidFields[key] = fields[key]
        }
    }

    if (Object.getOwnPropertyNames(invalidFields).length >= 1) {
        return next(new BadRequestError(JSON.stringify(invalidFields)));
    }

    let updates: any = {}

    for (let key in validFields) {
        if (validFields[key] !== food[key as keyof SellableFoodModel]) {
            updates[key] = validFields[key]
        }
    }

    if (Object.getOwnPropertyNames(updates).length !== 0) {
        try {
            await food.update(updates)
            return res.status(202).json({ status: "updated" })
        } catch (error) {
            return next(new InternalServerError("Server Error"))
        }
    }

    return res.status(202).json({ status: "no changes" })
}

export { getFoods, createFood, deleteFood, updateFood }


function isFood(value: any): value is SellabeFoodAttributes {
    return typeof
        value === "object" &&
        "title" in value &&
        "description" in value &&
        "price" in value &&
        "user_id" in value &&
        "category_id" in value
}