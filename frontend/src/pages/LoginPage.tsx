import { Form } from "react-router-dom";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    return <>
        <div className={`text-black h-max md:border-2 border-black p-10 rounded-lg shadow-lg md:shadow-black`}>
            <h1 className="text-4xl font-bold mb-8">BEJELENTKEZÉS</h1>
            <Form className="mb-8">
                <Input name="email" type="email" label="Email" />
                <Input name="password" type="password" label="Password" />
            </Form>
            <div className="flex flex-row justify-between">
                <button className="ml-4 mr-4 w-full p-3 bg-green-600 rounded-md hover:bg-green-800">Bejelentkezés</button>
                <button className="ml-4 mr-4 w-full p-3 bg-green-600 rounded-md  hover:bg-green-800" onClick={() => navigate("/register")}>Regisztráció</button>
            </div>
        </div>
    </>
}

export default Login;