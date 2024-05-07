import { Outlet } from "react-router-dom"
import headerIMG from "../../assets/Fejléc.jpg"

import logoIMG from "../../assets/Logo.png"
import MainNav from "../../components/MainNavigation"


const Layout = () => {

    return <>
        <header className="relative border-2 border-l-0 border-r-0 border-black border-collapse">
            <div>
                <img className="w-full h-auto max-h-32" src={headerIMG} alt="fejléc" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <img src={logoIMG} className="h-full" alt="logó" />
            </div>
        </header>
        <MainNav />
        <main className=" min-w-[100vw] h-max min-h-screen bg-orange-500 border-l-0 border-r-0 border-t-2 border-black flex justify-center items-center">
            <Outlet />
        </main>
    </>
}

export default Layout