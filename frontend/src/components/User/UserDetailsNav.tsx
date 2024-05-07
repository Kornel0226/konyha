import { NavLink } from "react-router-dom"

const UserDetailsNav = () => {

    return <nav className="bg-green-800 w-[100%] h-max lg:min-h-[115vh] lg:border-r-2 border-black lg:w-[20%]">
        <ul className="flex flex-row lg:flex-col text-3xl">
            <li className="p-4 flex-1 border-b-2 border-r-2 lg:border-r-0 md:border-r-0 border-black"><NavLink to={"adataim"}>Adataim</NavLink></li>
            <li className="p-4 flex-1 border-b-2 border-black"><NavLink to={"recepteim"}>Recepteim</NavLink></li>
        </ul>
    </nav>
}

export default UserDetailsNav