import { FC } from "react";
import { User } from "../../requests/user";
import UserDetailsInput from "./UserDetailsInput";

const UserDetails: FC<{ user: User }> = ({ user }) => {
    return <div className="flex flex-row gap-16 bg-orange-300 p-5 rounded-tr-md rounded-br-md shadow-xl h-full">
        <div className="flex flex-col gap-5">
            <UserDetailsInput label="Username:" name="username" type="text" defaultValue={user.username} />
            <UserDetailsInput label="Email:" name="email" type="text" defaultValue={user.email} />
            <UserDetailsInput label="Firstname:" name="password" type="text" defaultValue={""} />
        </div >
        <div className="flex flex-col gap-5">
            <UserDetailsInput label="LastName:" name="password" type="text" defaultValue={""} />
            <UserDetailsInput label="Password:" name="password" type="text" defaultValue={""} />
        </div>
    </div>
}

export default UserDetails