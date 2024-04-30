import { Outlet } from "react-router-dom"
import headerIMG from "../assets/Fejléc.jpg"

import logoIMG from "../assets/Logo.png"
import MainNav from "../components/MainNavigation"


const Layout = () => {

    return <>
        <header className="relative border-2 border-black border-collapse">
            <div>
                <img className="w-full h-auto max-h-32" src={headerIMG} alt="fejléc" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <img src={logoIMG} className="h-full" alt="logó" />
            </div>
        </header>
        <MainNav />
        <main className="min-h-[82vh] min-w-[100%] bg-orange-500 border-2 border-black flex justify-center items-center">
            <Outlet />
        </main>
    </>
}

export default Layout