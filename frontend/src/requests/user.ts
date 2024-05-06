import axios, { AxiosError } from 'axios';

// Define a custom type for the error response
interface ErrorResponse {
    message: string;
    // Add other properties as needed
}

export type User = {
    user_id: number,
    username: string,
    email: string,
    profile_picture: null
    is_admin: false,
    created_At: Date,
    updated_At: Date
}



const getAuthenticatedUser = async (token: string) => {
    try {
        const response = await axios.get("http://localhost:5000/api/v1/users/user", {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                throw axiosError.response.data;
            } else if (axiosError.request) {
                // The request was made but no response was received
                throw new Error('No response received from the server.');
            } else {
                // Something happened in setting up the request that triggered an Error
                throw new Error('Error setting up the request.');
            }
        } else {
            // Handle other types of errors
            throw new Error('Unexpected error occurred.');
        }
    }
};

const getAuthenticatedUserRecipes = async (token: string) => {
    try {
        const response = await axios.get("http://localhost:5000/api/v1/users/user/recipes", {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        return response.data.recipes;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                throw axiosError.response.data;
            } else if (axiosError.request) {
                // The request was made but no response was received
                throw new Error('No response received from the server.');
            } else {
                // Something happened in setting up the request that triggered an Error
                throw new Error('Error setting up the request.');
            }
        } else {
            // Handle other types of errors
            throw new Error('Unexpected error occurred.');
        }
    }
}

export { getAuthenticatedUser, getAuthenticatedUserRecipes }