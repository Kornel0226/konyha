import axios, { AxiosError } from 'axios';

// Define a custom type for the error response
interface ErrorResponse {
    message: string;
    // Add other properties as needed
}

const register = async (user: { email: string, password: string, username: string }) => {
    try {
        const response = await axios.post("http://localhost:5000/api/v1/users/register", user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
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

export default register;