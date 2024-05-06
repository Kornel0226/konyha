import { forwardRef } from "react";
import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: string | undefined;
    label: string
    type: string
    name: string
    defaultValue?: string
};

const RecipeCreationInput = forwardRef<HTMLInputElement, InputProps>(({ error, label, type, name, defaultValue }, ref) => {

    let inputClass = "bg-white h-10 rounded-md border-2 border-black p-2 text-lg text-black"

    if (error) {
        inputClass += " border-red-700 bg-red-500"
    }

    return (
        <div className="flex flex-col">
            <label className="text-xl text-gray-500" htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                ref={ref}
                className={inputClass}
                defaultValue={defaultValue}

            />
            {error && <p className="text-red-700 font-bold max-w-52">{error}</p>}
        </div>
    );
});

export default RecipeCreationInput;