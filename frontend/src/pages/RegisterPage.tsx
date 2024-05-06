import { Form } from "react-router-dom";
import Input from "../components/Input";
import { SyntheticEvent, useState } from "react";
import { validateEmail, validatePassword } from "../util/validation";
import { useRef } from "react";
import register from "../requests/register";

type Validation = {
    email: {
        isValid: boolean,
        message: string
    }
    username: {
        isValid: boolean,
        message: string
    }

    password: {
        isValid: boolean,
        message: string
    }

}

const Register = () => {

    const [validation, setValidation] = useState<Validation>({
        email: {
            isValid: true,
            message: ""
        },
        username: {
            isValid: true,
            message: ""
        },
        password: {
            isValid: true,
            message: ""
        },

    })

    const username = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const password2 = useRef<HTMLInputElement>(null)

    const handleSubmit = (event: SyntheticEvent) => {

        const validationCopy = { ...validation }

        if (!username.current?.value) {
            validationCopy.username = { isValid: false, message: "Mezo kitoltese kotelezo!" }
        } else {
            validationCopy.username = { isValid: true, message: "" }
        }

        if (!email.current?.value) {
            validationCopy.email = { isValid: false, message: "Mezo kitoltese kotelezo!" }
        }
        else {
            const value = email.current.value || ""
            validationCopy.email = validateEmail(value);
        }

        if (!password.current?.value) {
            validationCopy.password = { isValid: false, message: "Mezo kitoltese kotelezo!" }
        }
        else {
            const value = password.current.value || ""
            validationCopy.password = validatePassword(value);
        }

        const isFormValid = Object.values(validationCopy).every(field => field.isValid);

        setValidation(validationCopy);

        if (!isFormValid) {
            event.preventDefault();
        }
    }

    return <>
        <div className={`text-black h-max md:border-2 border-black p-10 rounded-lg shadow-lg md:shadow-black`}>
            <h1 className="text-4xl font-bold mb-8">Regisztráció</h1>
            <Form method="post" onSubmit={handleSubmit}>
                <div className="mb-8 flex flex-col md:flex-row md:gap-12">
                    <div>
                        <Input name="email" type="email" ref={email} label="Email" error={validation.email.isValid ? undefined : validation.email.message} />
                        <Input name="username" ref={username} type="text" label="Felhasználónév:" error={validation.username.isValid ? undefined : validation.username.message} />
                    </div>
                    <div>
                        <Input name="password" ref={password} type="password" label="Jelszó" error={validation.password.isValid ? undefined : validation.password.message} />
                        <Input name="passwordx" ref={password2} type="password" label="Jelszó újra" />
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <button className="ml-4 mr-4 w-full p-3 bg-green-600 rounded-md  hover:bg-green-800">Regisztráció</button>
                </div>
            </Form>
        </div>
    </>
}


const regAction = async ({ request }: { request: Request }) => {

    const formData = await request.formData();

    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password")
    }

    if (!data.username || !data.email || !data.password) {
        return null;
    }

    const user = {
        username: data.username.toString(),
        email: data.email.toString(),
        password: data.password.toString()
    }

    try {
        console.log(user)
        const response = await register(user);

        if (response.status < 300 && response.status >= 200) {
            console.log("sikeres regisztracio")
            return null
        }
    } catch (error) {
        console.log(error)
        return null
    }
}


export default Register;

// eslint-disable-next-line react-refresh/only-export-components
export { regAction }