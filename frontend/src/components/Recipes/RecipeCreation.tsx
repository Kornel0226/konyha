import { SyntheticEvent, useState, useRef, FC } from "react";
import { createRecipe, RecipeCreationType, updateRecipe } from "../../requests/recipes";
import { Form } from "react-router-dom";
import RecipeCreationInput from "./RecipeCreationInput";
import ImageUploader from "./ImageUploader";
import CategorySelection from "../Category/CategorySelection";
import DifficultySelection from "../Difficulty/DifficultySelection";
import IngredientCreation from "../Ingredient/IngredientsCreation";
import { Ingredient } from "../../requests/ingredient";


const RecipeCreation: FC<{ token: string }> = ({ token }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imageUrl, setSelectedImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [recipeData, setRecipeData] = useState<RecipeCreationType | null>(null);
    const [ingredients, setIngredients] = useState<Ingredient[]>([])


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setSelectedImage(file);
            const imageUrl = URL.createObjectURL(file);
            setSelectedImageUrl(imageUrl);
        }
    };

    const changeIngredientsHandle = (ingredients: Ingredient[]) => {
        setIngredients(ingredients);
    }

    const onSubmitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();
        const formElement = event.target as HTMLFormElement;
        const formData = new FormData(formElement);
        const title = formData.get("title") as string;
        const preparation_time = formData.get("preparation_time") as string;
        const difficulty_level = formData.get("difficulty_level") as "EASY" | "MEDIUM" | "HARD";
        const category_id = formData.get("category_id") as string;
        const description = formData.get("description") as string;

        if (!title || !preparation_time || !difficulty_level || !category_id || !description) {
            console.log("Missing data");
            return;
        }

        formData.append('ingredients', JSON.stringify(ingredients))

        try {
            const response = await createRecipe(token, formData); // Send formData containing image
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return <Form encType={"multipart/form-data"} className="flex-1 bg-orange-300 p-10 h-max" onSubmit={(event) => onSubmitHandler(event)}>
        <div className="flex flex-col">
            <h1 className="text-[2rem] lg:text-[5rem] text-orange-600 font-bold mb-10 border-b-2 border-orange-800">Recept Létrehozás</h1>
            <div className="flex flex-col lg:flex-row lg:gap-40">
                <div>
                    <div className="flex flex-col lg:flex-row lg:gap-8 mb-10 w-max">
                        <div>
                            <RecipeCreationInput label="Név:" name="title" type="text" />
                            <RecipeCreationInput label="Elkészítési ido:" name="preparation_time" type="number" />
                        </div>
                        <div className="w-max">
                            <DifficultySelection />
                            <CategorySelection />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xl text-gray-500" htmlFor="x">Leírás:</label>
                        <textarea rows={200} className="bg-white w-[100%] h-52   rounded-md border-2 border-black p-2 text-lg text-black" name="description"></textarea>
                    </div>
                    <div className="w-max mt-10 mb-10">
                        <ImageUploader onChange={handleImageChange} selectedImageUrl={imageUrl} />
                    </div>
                </div>
                <div className="flex flex-col gap-10">
                    <IngredientCreation ingredientsChange={changeIngredientsHandle} />
                </div>
            </div>
        </div>

        <button className="mt-5 bg-green-800 p-2 text-xl font-bold rounded-lg shadow-md">Kuldes</button>
    </Form>

}

export default RecipeCreation