"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_connect_1 = require("./config/db_connect");
const User_1 = require("./models/User");
const user_1 = __importDefault(require("./routes/user"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const sequalizeErrorhandler_1 = __importDefault(require("./middleware/sequalizeErrorhandler"));
const dotenv_1 = __importDefault(require("dotenv"));
const recipes_1 = require("./routes/recipes");
const category_1 = __importDefault(require("./routes/category"));
const ingredient_1 = __importDefault(require("./routes/ingredient"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const uploadFolders = ['uploads/foods', 'uploads/recipes', 'uploads/userpictures'];
// Create the folders if they don't exist
app.use(express_1.default.urlencoded({ extended: true }));
const startServer = async () => {
    try {
        const PORT = 5000;
        exports.database = await (0, db_connect_1.dbConnect)(); // Wait for database connection
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start the server:", error);
    }
};
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Serve images from the 'uploads/foods' directory
app.use('/uploads/foods', express_1.default.static('./uploads/foods'));
// Serve images from the 'uploads/recipes' directory
app.use('/uploads/recipes', express_1.default.static('./uploads/recipes'));
// Serve images from the 'uploads/userpictures' directory
app.use('/uploads/userpictures', express_1.default.static('./uploads/userpictures'));
app.get("/", async (req, res) => {
    try {
        const recipe = await User_1.User.findOne({ where: { user_id: 2 } });
        res.json({ "ok": true });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});
//Routerek
app.use("/api/v1/users", user_1.default);
app.use("/api/v1/recipes", recipes_1.recipeRouter);
app.use("/api/v1/categories", category_1.default);
app.use("/api/v1/ingredients", ingredient_1.default);
app.use(sequalizeErrorhandler_1.default);
app.use(errorHandler_1.default);
startServer();
