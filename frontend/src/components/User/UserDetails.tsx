import { FC, SyntheticEvent, useState } from "react";
import { updateUser, User } from "../../requests/user";
import UserDetailsInput from "./UserDetailsInput";
import { Form } from "react-router-dom";
import { useRef } from "react";
import { Validation } from "../../pages/RegisterPage";
import { validateEmail, validatePassword } from "../../util/validation";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContex";

type Fields = {
    email?: string | null;
    password?: string | null;
    username?: string | null;
};

const UserDetails: FC<{ user: User }> = ({ user }) => {

    const userdata = useContext(AppContext).user
    const { openModal } = useContext(AppContext)
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
    const [isUpdated, setIsUpdated] = useState(false)

    const username = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const password2 = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)

    const handleOnSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement)
        const validationCopy = { ...validation }

        if (!username.current?.value) {
            validationCopy.username = { isValid: false, message: "Mező kitöltése kötelező!" }
        } else {
            validationCopy.username = { isValid: true, message: "" }
        }

        if (!email.current?.value) {
            validationCopy.email = { isValid: false, message: "Mező kitöltése kötelező!" }
        }
        else {
            const value = email.current.value || ""
            validationCopy.email = validateEmail(value);
        }

        if (!password.current?.value) {
            validationCopy.password = { isValid: false, message: "Mező kitöltése kötelező!" }
        }
        else if (password.current?.value !== password2.current?.value) {
            validationCopy.password = { isValid: false, message: "A jelszavak nem egyeznek!!" }
        }
        else {
            const value = password.current.value || ""
            validationCopy.password = validatePassword(value);
        }

        const isFormValid = Object.values(validationCopy).every(field => field.isValid);

        setValidation(validationCopy);

        if (!isFormValid) {
            return
        }

        const fields: Fields = {}

        if (formData.get("email")) {
            fields["email"] = formData.get("email")?.toString()
        }
        if (formData.get("password")) {
            fields["password"] = formData.get("password")?.toString()
        }
        if (formData.get("username")) {
            fields["username"] = formData.get("username")?.toString()
        }

        console.log(fields)

        try {
            if (userdata) {
                updateUser(userdata.token, { fields });
                setIsUpdated(true)
            }
        } catch (error) {
            openModal("Hiba történt a profil frissítése közben")
        }
    }



    return <Form method="post" onSubmit={handleOnSubmit} className="flex flex-col min-h-[100vh] lg:flex-row lg:gap-16 bg-orange-300 p-5 rounded-tr-md rounded-br-md shadow-xl h-full">
        <div className="flex flex-col gap-5" >
            <UserDetailsInput ref={username} label="Felhasználónév:" name="username" error={!validation.username.isValid ? validation.username.message : undefined} type="text" defaultValue={user.username} />
            <UserDetailsInput ref={email} label="Email:" name="email" type="text" defaultValue={user.email} error={!validation.email.isValid ? validation.email.message : undefined} />
            {isUpdated && <p className="font-semibold text-green-800">Profil adatok frissítve</p>}
        </div>
        <div className="flex flex-col gap-5">
            <UserDetailsInput ref={password} label="Jelszó:" name="password" type="password" defaultValue={""} error={!validation.password.isValid ? validation.password.message : undefined} />
            <UserDetailsInput ref={password2} label="Jelszó újra:" name="password2" type="password" defaultValue={""} error={!validation.password.isValid ? validation.password.message : undefined} />
            <button disabled={isUpdated} className="bg-green-800 p-2 mt-2 rounded-md font-bold">Frissítés</button>
        </div>

    </Form >
}

export default UserDetails