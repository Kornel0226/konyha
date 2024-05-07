import { RequestHandler } from "express";
import multer from "multer";
import BadRequestError from "../errors/bad-request";
import * as fs from 'fs'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let destinationFolder;
        if (file.fieldname === 'foodImage') {
            destinationFolder = 'uploads/foods/';
        } else if (file.fieldname === 'recipeImage') {
            destinationFolder = 'uploads/recipes/';
        } else if (file.fieldname === 'userPicture') {
            destinationFolder = 'uploads/userpictures/';
        } else {
            // Default destination if fieldname doesn't match any known type
            destinationFolder = 'uploads/others/';
        }
        // Create the directory if it doesn't exist
        fs.mkdirSync(destinationFolder, { recursive: true });
        cb(null, destinationFolder);
    },
    filename: function (req, file, cb) {
        // Rename file to avoid conflicts
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const imageUploader: RequestHandler = async (req, res, next) => {
    const upload = multer({ storage: storage })

    console.log(req.file)

    try {
        upload.single(req.file.fieldname)(req, res, (err) => {
            if (err) {

                return next(new BadRequestError("Invalid Image"))
            } else {

                // Assuming the file was successfully uploaded, add its path to req.body
                req.body.imagePath = req.file.path;
                next(); // Move to the next middleware
            }
        });
    } catch (error) {
        console.error(error)
        return next(new BadRequestError("Invalid Image"))

    }
}

export default imageUploader;

