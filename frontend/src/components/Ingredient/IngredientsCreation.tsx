import { useState, FC } from "react";
import IngredientField from "./IngredientField";
import { Ingredient } from "../../requests/ingredient";

const IngredientCreation: FC<{ ingredientsChange: (ingredients: Ingredient[]) => void, defaulVal?: Ingredient[] }> = ({ ingredientsChange, defaulVal }) => {
    const [fields, setFields] = useState<Ingredient[]>(defaulVal || [{ quantity: 1, name: "", unit: "" }]);

    const handleFieldChange = (index: number, field: Partial<Ingredient>) => {
        setFields(prevFields => {
            const newFields = [...prevFields];
            newFields[index] = { ...newFields[index], ...field };
            ingredientsChange(newFields);
            return newFields;
        });
    };

    const increment = () => {
        setFields(prevFields => [...prevFields, { quantity: 1, name: "", unit: "" }]);
    };

    const decrement = (index: number) => {
        setFields(prevFields => {
            const newFields = [...prevFields];
            newFields.splice(index, 1);
            return newFields;
        });
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-col border-b-2 border-orange-800 lg:justify-center">
                <h2 className="text-5xl text-orange-600 font-semibold">Hozzávalók</h2>
                <button className="mt-5 p-2 w-1/2 lg:w-1/4 mb-5 rounded-lg bg-green-800" type="button" onClick={increment}>Mezo hozzáadása</button>

            </div>

            <div className="flex flex-col gap-4 overflow-y-auto max-h-96">
                {fields.map((field, index) => (
                    <IngredientField
                        key={index}
                        onDelete={() => decrement(index)}
                        field={field}
                        onChange={(updatedField) => handleFieldChange(index, updatedField)}
                    />
                ))}
            </div>

        </div>
    );
};

export default IngredientCreation;
