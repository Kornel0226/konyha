import axios, { AxiosError } from "axios";
import { ErrorResponse } from "react-router-dom";

export type CategoriesType = {
    category_id: number,
    name: "string",
    createdAt: Date,
    updatedAt: Date
}

const getCategories = async () => {

    try {
        const response = await axios.get("http://localhost:5000/api/v1/categories")

        return response.data.categories
    } catch (error: unknown) {
        // Error handling
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

const getCategory = async (id: string) => {

    try {
        const response = await axios.get("http://localhost:5000/api/v1/categories/" + id)

        return response.data.category
    } catch (error: unknown) {
        // Error handling
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

export default getCategories
export { getCategory }
