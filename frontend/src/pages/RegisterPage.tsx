import { Form } from "react-router-dom";
import Input from "../components/Input";
import { SyntheticEvent, useState } from "react";
import { validateEmail, validatePassword } from "../util/validation";
import { useRef } from "react";

type Validation = {
    email: {
        isValid: boolean,
        message: string
    }
    firstName: {
        isValid: boolean,
        message: string
    }
    lastName: {
        isValid: boolean,
        message: string
    }
    password: {
        isValid: boolean,
        message: string
    }
    birthday: {
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
        firstName: {
            isValid: true,
            message: ""
        },
        lastName: {
            isValid: true,
            message: ""
        },
        password: {
            isValid: true,
            message: ""
        },
        birthday: {
            isValid: true,
            message: ""
        }
    })

    const firstName = useRef<HTMLInputElement>(null)
    const lastName = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const password2 = useRef<HTMLInputElement>(null)
    const birthDate = useRef<HTMLInputElement>(null)

    const handleSubmit = (event: SyntheticEvent) => {

        const validationCopy = { ...validation }

        if (!firstName.current?.value) {
            validationCopy.firstName = { isValid: false, message: "Mezo kitoltese kotelezo!" }
        } else {
            validationCopy.firstName = { isValid: true, message: "" }
        }

        if (!lastName.current?.value) {
            validationCopy.lastName = { isValid: false, message: "Mezo kitoltese kotelezo!" }
        } else {
            validationCopy.lastName = { isValid: true, message: "" }
        }

        if (!birthDate.current?.value) {
            validationCopy.birthday = { isValid: false, message: "Mezo kitoltese kotelezo!" }
        } else {
            validationCopy.birthday = { isValid: true, message: "" }
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
                        <Input name="firstName" ref={firstName} type="text" label="Vezetéknév" error={validation.firstName.isValid ? undefined : validation.firstName.message} />
                        <Input name="lastName" ref={lastName} type="text" label="Keresztnév" error={validation.lastName.isValid ? undefined : validation.lastName.message} />
                    </div>
                    <div>
                        <Input name="birthDate" ref={birthDate} type="date" label="Szuletesi datum" error={validation.birthday.isValid ? undefined : validation.birthday.message} />
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
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        birthDate: formData.get("birthDate"),
        password: formData.get("password")
    }

    if (!data.firstName || !data.lastName || !data.email || !data.birthDate || !data.password) {
        return null;
    }

    console.log(data);
    return null
}


export default Register;

export { regAction }