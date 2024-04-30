import { NavLink } from "react-router-dom";
import { useState } from "react";

export const MainNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="relative">
            <div className="w-full bg-orange-400 h-10 flex flex-row items-center pl-2 pr-2 border-l-2 border-r-2 border-black">
                <button
                    className="block text-3xl md:hidden" // Hide button on medium and larger screens
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    &#9776; {/* Hamburger menu icon */}
                </button>
                <menu className={`w-full bg-orange-400 text-2xl font-bold ${isMenuOpen ? "block absolute top-full left-0 z-10 border-black border-x-2 border-t-2" : "hidden"} md:block md:flex-col`}>
                    <ul className={`flex flex-row ${isMenuOpen ? "flex-col" : "gap-6"}`}>
                        <li className={`${isMenuOpen ? "text-center border-b-2 border-black py-2" : ""}`} onClick={() => setIsMenuOpen(false)}><NavLink to="">KEZDOLAP</NavLink></li>
                        <li className={`${isMenuOpen ? "text-center border-b-2 border-black py-2" : "ml-auto"}`} onClick={() => setIsMenuOpen(false)}><NavLink to="/login">BEJELENTKEZES</NavLink></li>
                        <li className={`${isMenuOpen ? "text-center border-b-2 border-black py-2" : ""}`} onClick={() => setIsMenuOpen(false)}><NavLink to="/register">REGISZTRACIO</NavLink></li>
                    </ul>
                </menu>
            </div>
        </nav>
    );
};

export default MainNav;