"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const fs = __importStar(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        let destinationFolder;
        if (file.fieldname === 'foodImage') {
            destinationFolder = 'uploads/foods/';
        }
        else if (file.fieldname === 'recipeImage') {
            destinationFolder = 'uploads/recipes/';
        }
        else if (file.fieldname === 'userPicture') {
            destinationFolder = 'uploads/userpictures/';
        }
        else {
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
const imageUploader = async (req, res, next) => {
    const upload = (0, multer_1.default)({ storage: storage });
    console.log(req.file);
    try {
        upload.single(req.file.fieldname)(req, res, (err) => {
            if (err) {
                return next(new bad_request_1.default("Invalid Image"));
            }
            else {
                // Assuming the file was successfully uploaded, add its path to req.body
                req.body.imagePath = req.file.path;
                next(); // Move to the next middleware
            }
        });
    }
    catch (error) {
        console.error(error);
        return next(new bad_request_1.default("Invalid Image"));
    }
};
exports.default = imageUploader;
