import { Router } from "express";
import { createRecipe, deleteRecipe, getRecipe, getRecipes, updateRecipe } from "../controllers/recipe";
import authentication from "../middleware/authentication";
import { getIngredients } from "../controllers/ingredient";
import multer from "multer";
import path from "path";
import imageUploader from "../middleware/imageUploader";
import * as fs from "fs"

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
        cb(null, Date.now() + '-' + Date.now() + path.extname(file.originalname));
    }
});


const recipeRouter = Router()
recipeRouter.route("/").get(getRecipes);
const upload = multer({ storage })


recipeRouter.route("/add").post(authentication, upload.single('recipeImage'), createRecipe);
recipeRouter.route("/:recipeId").get(getRecipe).delete(authentication, deleteRecipe).patch(authentication, upload.single('recipeImage'), updateRecipe);
recipeRouter.route("/:recipeId/ingredients").get(getIngredients);

export { recipeRouter }     