import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContex";
import UserNavItem from "./userNavItem";

export const MainNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { user } = useContext(AppContext)

    return (
        <nav className="relative">
            <div className="w-full bg-orange-400 h-10 flex flex-row items-center pl-2 pr-2">
                <button
                    className="block text-3xl md:hidden" // Hide button on medium and larger screens
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    &#9776; {/* Hamburger menu icon */}
                </button>
                <menu className={`w-full bg-orange-400 text-2xl font-bold ${isMenuOpen ? "block absolute top-full left-0 z-50 border-black border-x-2 border-t-2" : "hidden"} md:block md:flex-col`}>
                    <ul className={`flex flex-row ${isMenuOpen ? "flex-col" : "gap-6"}`}>
                        <li className={`${isMenuOpen ? "text-center border-b-2 border-black py-2" : ""} text-black`} onClick={() => setIsMenuOpen(false)}><NavLink to="">Kezdőlap</NavLink></li>
                        <li className={`${isMenuOpen ? "text-center border-b-2 border-black py-2" : ""} text-black`} onClick={() => setIsMenuOpen(false)}><NavLink to="/receptek">Receptek</NavLink></li>
                        {!user && <li className={`${isMenuOpen ? "text-center border-b-2 border-black py-2" : "ml-auto"} text-black`} onClick={() => setIsMenuOpen(false)}><NavLink to="/login">Bejelentkezés</NavLink></li>}
                        {!user && <li className={`${isMenuOpen ? "text-center border-b-2 border-black py-2" : ""} text-black`} onClick={() => setIsMenuOpen(false)}><NavLink to="/register">Regisztráció</NavLink></li>}
                        <li className={`${isMenuOpen ? "text-center border-b-2 border-black py-2" : ""} text-black`}>
                            {user && <UserNavItem />}
                        </li>
                    </ul>
                </menu>
            </div>
        </nav>
    );
};

export default MainNav;