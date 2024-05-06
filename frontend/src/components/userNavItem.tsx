import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "../contexts/AppContex"

const UserNavItem = () => {

    const { user } = useContext(AppContext);

    return <li><NavLink to="/profil">{user?.username}</NavLink></li>

}


export default UserNavItem