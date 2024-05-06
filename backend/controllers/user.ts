import { RequestHandler } from "express";
import { User, UserModel } from "../models/User";
import BadRequestError from "../errors/bad-request";
import InternalServerError from "../errors/internal-server-error";
import NotFoundError from "../errors/not-found";
import { AuthUser } from "../middleware/authentication";
import UnauthorizedError from "../errors/unauthorizedError";
// Userrel kapcsolatos endpointok

// Egy felhasználó lekérése id (user_id) alapjan

const getUser: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const { fields } = req.query;

    if (!id) {
        return next(new BadRequestError("No id provided!"));
    }

    if (isNaN(parseInt(id))) {
        return next(new BadRequestError("Not valid id"));
    }

    let requestedFields: string[] | undefined;

    if (fields && typeof fields === "string") {
        // Get valid properties of UserModel
        const validProperties = Object.keys(User.getAttributes());

        // Split fields by comma, trim, and filter out invalid fields
        requestedFields = fields.split(',')
            .map((field: string) => field.trim())
            .filter((field) => validProperties.includes(field) && field !== "password");
    }


    let user: UserModel | null;

    if (requestedFields && requestedFields.length === 0) {
        return next(new BadRequestError("Not valid fields"))
    }

    try {
        user = await User.findOne({
            where: { user_id: parseInt(id) },
            attributes: requestedFields ? requestedFields : { exclude: ["password"] },
        });
    } catch (error) {
        return next(new InternalServerError("Server error"));
    }

    if (!user) {
        return next(new NotFoundError("User not found."));
    }

    res.status(200).json(user);
};

const getLoggedUser: RequestHandler = async (req, res, next) => {
    const { fields } = req.query;

    const au = req.user as AuthUser


    if (!au) {
        return next(new UnauthorizedError("Acces Deined"));
    }

    const id = au.id

    if (!id) {
        return next(new BadRequestError("No id provided!"));
    }


    let requestedFields: string[] | undefined;

    if (fields && typeof fields === "string") {
        // Get valid properties of UserModel
        const validProperties = Object.keys(User.getAttributes());

        // Split fields by comma, trim, and filter out invalid fields
        requestedFields = fields.split(',')
            .map((field: string) => field.trim())
            .filter((field) => validProperties.includes(field) && field !== "password");
    }


    let user: UserModel | null;

    if (requestedFields && requestedFields.length === 0) {
        return next(new BadRequestError("Not valid fields"))
    }

    try {
        user = await User.findOne({
            where: { user_id: id },
            attributes: requestedFields ? requestedFields : { exclude: ["password"] },
        });
    } catch (error) {
        return next(new InternalServerError("Server error"));
    }

    if (!user) {
        return next(new NotFoundError("User not found."));
    }

    res.status(200).json(user);
};

// patch user
const updateUser: RequestHandler = async (req, res, next) => {
    // by the authenticaiton middleware
    const { user } = req.body
    const { fields } = req.body
    const validProperties = Object.keys(User.getAttributes());

    let validFields: any = {};

    for (let key in fields) {
        if (validProperties.includes(key)) {
            validFields[key] = fields[key];
        }
    }

    if (Object.getOwnPropertyNames(validFields).length === 0) {
        return next(new BadRequestError("Invalid properties"))
    }


    let fetchedUser: UserModel | null;

    try {
        fetchedUser = await User.findOne({ where: { user_id: user.id } })
    } catch (error) {
        return next(new InternalServerError("Server Error"));
    }
    1
    if (!fetchedUser) {
        return next(new BadRequestError("User not found."))
    }

    let updates: any = {}

    for (let key in validFields) {
        if (validFields[key] !== fetchedUser[key as keyof UserModel]) {
            updates[key] = validFields[key]
        }
    }

    if (Object.getOwnPropertyNames(updates).length === 0) {
        return res.status(202).json({ updated: false })
    }

    try {
        const update = await fetchedUser.update(updates)
        res.status(202).json({ updated: true });
    } catch (error) {
        console.error(error)
        return next(new InternalServerError("Server Error"));
    }


}


export { getUser, getLoggedUser, updateUser }