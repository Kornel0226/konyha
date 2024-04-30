import { RequestHandler } from "express";
import { User, UserCreationAttributes } from "../models/User";
import BadRequestError from "../errors/bad-request";
import InternalServerError from "../errors/internal-server-error";
import { ValidationError } from "sequelize";
import { isValidEmail, isValidPassword, isValidUserName } from "../util/validations";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken";



const register: RequestHandler = async (req, res, next) => {
    const { username, email, password } = req.body;
    const validationErrors: object[] = [];

    // Check if required fields are missing
    if (!email) {
        validationErrors.push({ field: "email", error: "No email provided" });
    }
    if (!username) {
        validationErrors.push({ field: "username", error: "No username provided" });
    }
    if (!password) {
        validationErrors.push({ field: "password", error: "No password provided" });
    }

    // Validate email, username, and password format
    if (email && !isValidEmail(email)) {
        validationErrors.push({ field: "email", error: "Incorrect email format" });
    }
    if (username && !isValidUserName(username)) {
        validationErrors.push({ field: "username", error: "Incorrect username format" });
    }
    if (password && !isValidPassword(password)) {
        validationErrors.push({ field: "password", error: "Incorrect password format" });
    }

    // If there are any validation errors, return them
    if (validationErrors.length > 0) {
        const validationErrorsString = JSON.stringify(validationErrors);
        return next(new BadRequestError(validationErrorsString));
    }

    //hashing
    let hashedPassword: string;

    try {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
    } catch (error) {
        console.error("Error hashing password:", error);
        return next(new InternalServerError("Error processing password"));
    }


    // If no validation errors, proceed with creating the user
    const newUser: UserCreationAttributes = {
        username: username,
        email: email,
        password: hashedPassword
    };

    try {
        await User.create(newUser);
        // Send a 201 Created status code and a response message
        res.status(201).send("User created successfully");
    } catch (error) {
        console.error("Error during user creation", error);
        if (error instanceof ValidationError) {
            // Extract validation error messages
            const validationErrors = error.errors.map((err) => ({ field: err.path, error: err.message }));
            const validationErrorsString = JSON.stringify(validationErrors);
            return next(new BadRequestError(validationErrorsString));
        }
        return next(new InternalServerError("An unexpected error has occurred"));
    }
};

const login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;

    const validationErrors: object[] = []

    if (!email) {
        validationErrors.push({ email: "No email provided" })
    }

    if (!password) {
        validationErrors.push({ password: "No password provided" })
    }

    if (email && !isValidEmail(email)) {
        validationErrors.push({ email: "Invalid email!" })
    }

    if (password && !isValidPassword(password)) {
        validationErrors.push({ password: "Invalid password!" })
    }

    if (validationErrors.length > 0) {
        const validationErrorsString = JSON.stringify(validationErrors);
        return next(new BadRequestError(validationErrorsString));
    }

    const user = await User.findOne({ where: { email: email } })

    if (!user) {
        return next(new BadRequestError(JSON.stringify({ email: "No user with email" })))
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return next(new BadRequestError(JSON.stringify({ password: "Wrong password" })))
    }
    const jwtSecret = process.env.JWT_SECRET as string;
    const token = Jwt.sign({ id: user.user_id, username: user.username }, jwtSecret, { expiresIn: "1d" })
    res.json({ token: token })
}

export { register, login };

