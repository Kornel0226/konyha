import { forwardRef } from "react";
import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: string | undefined;
    label: string
    type: string
    name: string
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ error, label, type, name }, ref) => {

    let inputClass = "bg-white h-10 rounded-md border-2 border-black p-2 text-lg"

    if (error) {
        inputClass += " border-red-700 bg-red-500"
    }

    return (
        <div className="flex flex-col">
            <label className="text-xl" htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                ref={ref}
                className={inputClass}
            />
            {error && <p className="text-red-700 font-bold max-w-52">{error}</p>}
        </div>
    );
});

export default Input;