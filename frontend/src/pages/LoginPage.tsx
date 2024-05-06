import { Form, useActionData } from "react-router-dom";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import login from "../requests/login";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContex";

const Login = () => {

    const { loginUser } = useContext(AppContext)
    const user = useActionData() as { username: string, token: string }
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            loginUser(user.username, user.token);
        }
    }, [user, loginUser]);

    return <>
        <div className={`text-black h-max md:border-2 border-black p-10 rounded-lg shadow-lg md:shadow-black`}>
            <h1 className="text-4xl font-bold mb-8">BEJELENTKEZÉS</h1>
            <Form className="mb-8" method="post">
                <Input name="email" type="email" label="Email" />
                <Input name="password" type="password" label="Password" />
                <div className="flex flex-row justify-between">
                    <button className="ml-4 mr-4 w-full p-3 bg-green-600 rounded-md hover:bg-green-800">Bejelentkezés</button>
                    <button className="ml-4 mr-4 w-full p-3 bg-green-600 rounded-md  hover:bg-green-800" type="button" onClick={() => navigate("/register")}>Regisztráció</button>
                </div>
            </Form>

        </div>
    </>
}

const loginAction = async ({ request }: { request: Request }) => {

    const formData = await request.formData()

    const email = formData.get("email")
    const password = formData.get("password")

    if (!email || !password) {
        return null
    }

    const userData = {
        email: email.toString(),
        password: password.toString()
    }

    try {
        const user = await login(userData)
        return user
    } catch (error) {
        console.log(error)
        return null
    }
}

export default Login;

export { loginAction };