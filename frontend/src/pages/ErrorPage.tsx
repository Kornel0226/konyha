
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="w-full text-center h-[100vh] flex flex-col justify-center">
            <h1 className="lg:text-[5rem]">Oldal nem található</h1>
            <p>A keresett oldal nem található.</p>
            <Link className="text-blue-700" to="/">Vissza a főoldalra</Link>
        </div>
    );
}

export default ErrorPage;