import axios, { AxiosError } from 'axios';
import { ErrorResponse } from 'react-router-dom';

export type Recipe = {
    recipe_id: number,
    title: string,
    description: string,
    preparation_time: number,
    difficulty_level: "EASY" | "MEDIUM" | "HARD",
    user_id: number,
    category_id: number,
    image: string
    createdAt: Date,
    updatedAt: Date
}

export type RecipeCreationType = {
    title: string,
    description: string,
    preparation_time: number,
    difficulty_level: "EASY" | "MEDIUM" | "HARD",
    category_id: number,
    image?: unknown;
}

const createRecipe = async (token: string, formData: FormData) => {

    try {
        const response = await axios.post("http://localhost:5000/api/v1/recipes/add", formData, {
            headers: {
                Authorization: "Bearer " + token,
                'Content-Type': 'multipart/form-data'
            },
        });

        return response.data;
    } catch (error: unknown) {
        // Error handling
    }
};

const updateRecipe = async (token: string, recipe_id: number | undefined, formData: FormData) => {

    try {

        if (recipe_id) {
            const response = await axios.patch("http://localhost:5000/api/v1/recipes/" + recipe_id.toString(), formData, {
                headers: {
                    Authorization: "Bearer " + token,
                    'Content-Type': 'multipart/form-data'
                },
            });
            return response.data;
        } else {
            throw new Error("Invalid id");
        }

    } catch (error: unknown) {
        // Error handling
    }
};

const deleteRecipe = async (token: string, id: number) => {
    try {
        const response = await axios.delete("http://localhost:5000/api/v1/recipes/" + id.toString(), {
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

const getRecipe = async (id: number) => {
    try {
        const response = await axios.get("http://localhost:5000/api/v1/recipes/" + id.toString());

        return response.data.recipe;
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

const getRecipes = async (queries: string) => {
    try {
        let url = "http://localhost:5000/api/v1/recipes"
        console.log(queries)

        if (queries && queries !== "?") {
            url += queries
        }

        const response = await axios.get(url);

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
};


export { createRecipe, deleteRecipe, getRecipe, getRecipes, updateRecipe }