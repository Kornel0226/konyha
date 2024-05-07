import { useRef } from "react";
import { Ingredient } from "../../requests/ingredient";

type FieldProps = {
    field: Ingredient;
    onDelete: () => void;
    onChange: (updatedField: Partial<Ingredient>) => void;
};

const IngredientField = ({ field, onDelete, onChange }: FieldProps) => {
    const quantityRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const unitRef = useRef<HTMLInputElement>(null);

    const handleChange = () => {
        onChange({
            quantity: quantityRef.current?.value ? parseInt(quantityRef.current.value) : field.quantity,
            name: nameRef.current?.value,
            unit: unitRef.current?.value
        });
    };

    return (
        <div className="flex flex-col lg:flex-row border-b-2 border-orange-700 shadow-lg shadow-orange-900">
            <div className="flex flex-col m-4">
                <label htmlFor="quantity" className="text-black font-bold text-xl">Darab</label>
                <input
                    id="quantity"
                    form="nonExistentForm"
                    type="number"
                    ref={quantityRef}
                    name="quantity"
                    min={1}
                    value={field.quantity}
                    onChange={handleChange}
                    className="bg-white w-20 h-10 text-black text-center textfield appearance-none font-bold text-xl rounded-lg"
                />
            </div>
            <div className="flex flex-col m-4 ">
                <label htmlFor="name" className="text-black font-bold text-xl">Név</label>
                <input
                    id="name"
                    form="nonExistentForm"
                    type="text"
                    name="name"
                    ref={nameRef}
                    value={field.name}
                    onChange={handleChange}
                    className="bg-white font-semibold p-2 text-lg text-black h-10 rounded-lg"
                />
            </div>
            <div className="flex flex-col m-4">
                <label htmlFor="unit" className="text-black font-bold text-xl">Mértékegység</label>
                <input
                    id="unit"
                    form="nonExistentForm"
                    type="text"
                    ref={unitRef}
                    name="unit"
                    value={field.unit}
                    onChange={handleChange}
                    className="bg-white font-semibold text-lg p-2 h-10 w-14 rounded-lg text-black"
                />
            </div>
            <div className="flex flex-col justify-center pb-10">
                <button className="bg-red-700 w-1/2 lg:w-full p-2 rounded-lg shadow-lg" type="button" onClick={onDelete}>törles</button>
            </div>
        </div>
    );
};

export default IngredientField;