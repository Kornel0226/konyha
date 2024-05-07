
import { Link } from "react-router-dom";

const NotLoggedIn = () => {
    return (
        <div className="w-full text-center h-[100vh] flex flex-col justify-center">
            <h1 className="lg:text-[5rem]">Autentikációs hiba</h1>
            <p>Nem vagy bejelentkezve.</p>
            <Link className="text-blue-700" to="/">Vissza a főoldalra</Link>
        </div>
    );
}

export default NotLoggedIn;