const isValidPassword = (password: string): boolean => {

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_+=])[0-9a-zA-Z!@#$%^&*()-_+=]{8,}$/;
    return passwordRegex.test(password) && password.length >= 8;
};

const isValidUserName = (username: string) => {
    const userNameRegex = /^[a-zA-Z0-9_ÁáÉéÍíÓóÖöŐőÚúÜüŰű]{3,20}$/;
    return userNameRegex.test(username) && username.length >= 4;
}

const isValidEmail = (email: string) => {
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/
    return emailRegex.test(email);
}

export { isValidPassword, isValidUserName, isValidEmail }