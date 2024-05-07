"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = exports.isValidUserName = exports.isValidPassword = void 0;
const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_+=])[0-9a-zA-Z!@#$%^&*()-_+=]{8,}$/;
    return passwordRegex.test(password) && password.length >= 8;
};
exports.isValidPassword = isValidPassword;
const isValidUserName = (username) => {
    const userNameRegex = /^[a-zA-Z0-9_ÁáÉéÍíÓóÖöŐőÚúÜüŰű]{3,20}$/;
    return userNameRegex.test(username) && username.length >= 4;
};
exports.isValidUserName = isValidUserName;
const isValidEmail = (email) => {
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
};
exports.isValidEmail = isValidEmail;
