import axios, { AxiosError } from "axios";
import { ErrorResponse } from "react-router-dom";

export type Ingredient = {
    name: string,
    unit: string,
    quantity: number
    createdAt?: Date,
    updatedAt?: Date,
    recipe_id?: number,
    ingredient_id?: number
}

const getIngredients = async (id: number) => {
    console.log("http://localhost:5000/api/v1/recipes/" + id.toString() + "/ingredients");
    try {
        const response = await axios.get("http://localhost:5000/api/v1/recipes/" + id.toString() + "/ingredients");

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

export default getIngredients