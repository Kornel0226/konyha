import { FC, useEffect, useState } from "react"
import { getAuthenticatedUser, User } from "../../requests/user"
//import defaultAvatar from "../../assets/default_avatar.jpg"
import UserDetails from "./UserDetails";

const UserDetailsWrapper: FC<{ token: string }> = ({ token }) => {


    const [userData, setUserData] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchUserData = async (token: string) => {
            try {
                const data = await getAuthenticatedUser(token);
                setUserData(data);
            } catch (error) {
                setError("Error fetching user data");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) {
            fetchUserData(token);
        } else {
            setIsLoading(false);
        }
    }, [token]);


    return <div className="flex-1">
        {error && <p>error</p>}
        {isLoading && <p>Loading...</p>}
        {userData && <UserDetails user={userData} />}
    </div>
}

export default UserDetailsWrapper;
