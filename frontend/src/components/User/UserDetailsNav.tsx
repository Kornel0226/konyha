import { NavLink } from "react-router-dom"

const UserDetailsNav = () => {

    return <nav className="bg-green-800 w-[100%] h-max lg:min-h-[100vh] lg:w-[20%]">
        <ul className="flex flex-row lg:flex-col text-3xl">
            <li className="p-4 flex-1 border-2 border-t-0 border-black"><NavLink to={"adataim"}>Details</NavLink></li>
            <li className="p-4 flex-1 border-2 border-t-0 border-black"><NavLink to={"recepteim"}>Recipes</NavLink></li>
        </ul>
    </nav>
}

export default UserDetailsNav