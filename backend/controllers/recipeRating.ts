import { RequestHandler } from "express";
import BadRequestError from "../errors/bad-request";
import NotFoundError from "../errors/not-found";
import InternalServerError from "../errors/internal-server-error";
import ForbiddenError from "../errors/forbidden-error";
import { Rating, RatingCreationAttributes } from "../models/Rating";
import { Recipe } from "../models/Recipe";

const getRating: RequestHandler = async (req, res, next) => {
    const { ratingId } = req.params;

    if (!ratingId || isNaN(parseInt(ratingId))) {
        return next(new BadRequestError("Invalid ratingId provided"))
    }

    try {
        const rating = await Rating.findOne({ where: { rating_id: ratingId } })

        if (!rating) {
            return next(new NotFoundError("Rating not found"))
        }
        return res.status(200).json({ rating });
    } catch (error) {
        return next(new InternalServerError("Server Error"));
    }
}

const getRatings: RequestHandler = async (req, res, next) => {
    const { recipeId } = req.params;

    if (!recipeId || isNaN(parseInt(recipeId))) {
        return next(new BadRequestError("Invalid recipeId"));
    }



    try {
        const recipe = await Recipe.findByPk(recipeId)

        if (!recipe) {
            return next(new NotFoundError("Recipe not found"))
        }
        const ratings = await Rating.findAll({ where: { recipe_id: recipeId } });

        if (ratings.length === 0) {
            return next(new NotFoundError("No ratings found for the given recipeId."));
        }

        return res.status(200).json(ratings);
    } catch (error) {
        // Handle database or other internal errors
        console.error("Error retrieving ratings:", error);
        return next(new InternalServerError("Server Error"));
    }
}

const createRating: RequestHandler = async (req, res, next) => {
    const { rating, user } = req.body

    if (!rating) {
        return next(new BadRequestError("Nem adtál meg értékelést."))
    }

    rating.user_id = user.id

    if (!isRating(rating)) {
        return next(new BadRequestError("Hibás rating attribútumok"))
    }

    if (rating.rating <= 0 || rating.rating > 5) {
        return next(new BadRequestError("Invalid rating"))
    }

    if (rating.description.trim().length === 0) {
        return next(new BadRequestError("invalid description"))
    }

    try {
        const recipe = await Recipe.findByPk(rating.recipe_id)

        const recipe2 = await Recipe.findOne({ where: { recipe_id: rating.recipe_id, user_id: rating.user_id } })

        if (recipe2) {
            return next(new BadRequestError("User has a rating already connected to given recipe"))
        }

        if (!recipe) {
            return next(new NotFoundError("Recipe not found"))
        }

        const createdRating = await Rating.create(rating)

        return res.status(201).json(createdRating);
    } catch (error) {
        return next(new InternalServerError("Server Error"));
    }

}

const updateRating: RequestHandler = async (req, res, next) => {
    const { ratingId } = req.params;
    const { user, fields } = req.body;

    if (!ratingId || isNaN(parseInt(ratingId))) {
        return next(new BadRequestError("Invalid ratingId"));
    }

    if (!fields) {
        return next(new BadRequestError("No fields provided to update"));
    }

    const { rating, description } = fields;

    if (typeof description === "string" && description.length > 0 || typeof description === "undefined") {
        if (typeof rating === "number" && rating > 0 && rating <= 5 || typeof rating === "undefined") {
            const updates: any = { description, rating };

            try {
                const foundRating = await Rating.findOne({ where: { rating_id: ratingId } });

                if (!foundRating) {
                    return next(new NotFoundError("No rating exists with id"));
                }

                if (foundRating.user_id !== user.id) {
                    return next(new ForbiddenError("Access denied!"));
                }

                await foundRating.update(updates);
                res.status(202).json({ status: "updated" });
            } catch (error) {
                return next(new InternalServerError("Server Error"));
            }
        } else {
            return next(new BadRequestError("Invalid rating: rating must be a number between 1 and 5"));
        }
    }
    else {

        return next(new BadRequestError("Invalid description: description must be a non-empty string"))
    }
};

const deleteRating: RequestHandler = async (req, res, next) => {
    const { user } = req.body;
    const { ratingId } = req.params;

    if (!ratingId || isNaN(parseInt(ratingId))) {
        return next(new BadRequestError("No rating id provided."));
    }

    try {
        const rating = await Rating.findOne({ where: { rating_id: ratingId } });

        if (!rating) {
            return next(new BadRequestError("No rating found with id"));
        }

        if (rating.user_id !== user.id) {
            return next(new ForbiddenError("No access"));
        }

        await rating.destroy();
    } catch (error) {
        return next(new InternalServerError("Server Error"));
    }

    return res.status(203).json({ status: "deleted" });
};

export { getRatings, updateRating, deleteRating, getRating, createRating };

function isRating(value: any): value is RatingCreationAttributes {
    return typeof
        value === "object" &&
        "rating" in value &&
        "description" in value &&
        "recipe_id" in value
}