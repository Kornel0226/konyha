import UserDetailsNav from "../../components/User/UserDetailsNav";
import { Outlet } from "react-router-dom";

const UserLayout = () => {


    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen">
            <UserDetailsNav />
            <Outlet />
        </div>
    );
};

export default UserLayout;