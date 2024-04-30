import { RequestHandler } from "express";
import { User, UserAttributes, UserModel } from "../models/User";
import BadRequestError from "../errors/bad-request";
import InternalServerError from "../errors/internal-server-error";
import NotFoundError from "../errors/not-found";
// Userrel kapcsolatos endpointok

// Egy felhasználó lekérése id (user_id) alapjan

const getUser: RequestHandler = async (req, res, next) => {
    const {id} = req.params

    if (!id){
        return next(new BadRequestError("No id provided!"))
    }

   if(isNaN(parseInt(id))){
    return next(new BadRequestError("Not valid id"))
   }

    let user: UserModel | null

    try {
        user = await User.findOne({where:{user_id: parseInt(id)}})
    } catch (error) {
        console.log("ah")
        return next(new InternalServerError("Server error"))
    }

    if (!user){
        return next(new NotFoundError("User not found."))
    }

    res.status(200).json(user)
}

export {getUser}