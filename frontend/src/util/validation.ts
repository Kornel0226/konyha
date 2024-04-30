type ValidationObject = {
    isValid: boolean
    message: string
}

export const validateEmail = (email: string): ValidationObject => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
        return {
            isValid: true,
            message: ""
        }
    }
    return {
        isValid: false,
        message: "Hibás email!"
    }
}

export const validatePassword = (password: string): ValidationObject => {
    // Check if password length is at least 8 characters
    if (password.trim().length < 8) {
        return {
            isValid: false,
            message: "Túl rovid jelszó!"
        };
    }

    // Check if password contains at least one uppercase letter
    if (!/[A-Z]/.test(password.trim())) {
        return {
            isValid: false,
            message: "A jelszónak tartalmaznia kell legalább 1 nagybetut!"
        };
    }

    // Check if password contains at least one lowercase letter
    if (!/[a-z]/.test(password.trim())) {
        return {
            isValid: false,
            message: "A jelszónak tartalmaznia kell legalább 1 kisbetut!"
        };
    }

    // Check if password contains at least one digit
    if (!/\d/.test(password.trim())) {
        return {
            isValid: false,
            message: "A jelszónak tartalmaznia kell legalább 1 számot!"
        };
    }

    // Check if password contains at least one special character
    // You can customize the set of special characters as per your requirements
    if (!/[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(password.trim())) {
        return {
            isValid: false,
            message: "A jelszónak tartalmaznia kell legalább 1 speciális karaktert!"
        };
    }

    // If all conditions pass, return true
    return {
        isValid: true,
        message: ""
    };
};