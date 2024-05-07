import express, { json, Request } from 'express';
import cors from "cors"
import { dbConnect } from './config/db_connect';
import { User } from './models/User';
import { Model, Sequelize } from 'sequelize';
import { Recipe } from './models/Recipe';
import { Ingredient } from './models/Ingredient';
import { Category } from './models/Category';
import userRouter from './routes/user';
import bodyParser from 'body-parser';
import errorhandler from './middleware/errorHandler';
import sequelizeErrorHandler from './middleware/sequalizeErrorhandler';
import dotenv from "dotenv"
import { recipeRouter } from './routes/recipes';
import categoryRouter from './routes/category';
import ingredientRouter from './routes/ingredient';
import multer from "multer"
import * as fs from "fs"
import passport from "passport"
import path from 'path';

dotenv.config()

const app = express();
export let database: Sequelize;

const uploadFolders = ['uploads/foods', 'uploads/recipes', 'uploads/userpictures'];

// Create the folders if they don't exist

app.use(express.urlencoded({ extended: true }));


const startServer = async () => {
    try {
        const PORT = 5000;
        database = await dbConnect(); // Wait for database connection
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
};
app.use(express.json());
app.use(cors())


// Serve images from the 'uploads/foods' directory
app.use('/uploads/foods', express.static('./uploads/foods'));

// Serve images from the 'uploads/recipes' directory
app.use('/uploads/recipes', express.static('./uploads/recipes'));

// Serve images from the 'uploads/userpictures' directory
app.use('/uploads/userpictures', express.static('./uploads/userpictures'));


//Routerek

app.use("/api/v1/users", userRouter);
app.use("/api/v1/recipes", recipeRouter)
app.use("/api/v1/categories", categoryRouter)
app.use("/api/v1/ingredients", ingredientRouter);
app.use(sequelizeErrorHandler);
app.use(errorhandler);

startServer();


