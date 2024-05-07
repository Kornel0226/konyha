import { SyntheticEvent, useState, useRef, FC, useEffect } from "react";
import { getRecipe, RecipeCreationType, updateRecipe } from "../requests/recipes";
import { Form, useNavigate } from "react-router-dom";
import RecipeCreationInput from "../components/Recipes/RecipeCreationInput";
import ImageUploader from "../components/Recipes/ImageUploader";
import CategorySelection from "../components/Category/CategorySelection";
import DifficultySelection from "../components/Difficulty/DifficultySelection";
import IngredientCreation from "../components/Ingredient/IngredientsCreation";
import getIngredients, { Ingredient } from "../requests/ingredient";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContex";



const EditRecipePage: FC<{ token: string, }> = ({ token }) => {
    const [imageUrl, setSelectedImageUrl] = useState<string | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [recipeData, setRecipeData] = useState<RecipeCreationType | null>(null);
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const { recipeId, openModal } = useContext(AppContext)
    const navigate = useNavigate();
    const recipe_id = useRef<number>();

    useEffect(() => {
        async function fetchRecipe(recipeId: number) {
            try {
                const recipe = await getRecipe(recipeId)
                recipe_id.current = recipe.recipe_id
                const ingredients = await getIngredients(recipeId);
                setRecipeData(recipe)
                setIngredients(ingredients)
                setIsFetching(false)

            } catch (error) {
                console.log(error);
            }
            setIsFetching(false);
        }

        if (recipeId) {
            fetchRecipe(recipeId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setSelectedImageUrl(imageUrl);
        }
    };

    const changeIngredientsHandle = (ingredients: Ingredient[]) => {
        setIngredients(ingredients);
        console.log(ingredients)
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
            openModal("Üres mező")
            return;
        }

        if (ingredients.length === 0){
            openModal('nem adtál meg egy hozzávalót sem')
            return
        }

        ingredients.forEach((ingredient) => {
            if (!ingredient.name || ingredient.name.trim() === ""){
                openModal("Üres hozzávaló név")
            }
        })


        formData.append('ingredients', JSON.stringify(ingredients))

        try {
            await updateRecipe(token, recipe_id.current, formData); // Send formData containing image
            navigate("/profil/recepteim")
        } catch (error) {
            console.log(error)
        }
    };

    return <Form encType={"multipart/form-data"} className="flex-1 bg-orange-300 p-10 h-max" onSubmit={(event) => onSubmitHandler(event)}>
        <div className="flex flex-col">
            <h1 className="text-[2rem] lg:text-[5rem] text-orange-600 font-bold mb-10 border-b-2 border-orange-800">Recept Módosítása</h1>
            {recipeData && <div className="flex flex-col xl:flex-row xl:gap-40">
                <div>
                    <div className="flex flex-col lg:flex-row gap-8 mb-10 w-max">
                        <div>
                            <RecipeCreationInput defaultValue={recipeData.title} label="Név:" name="title" type="text" />
                            <RecipeCreationInput defaultValue={recipeData.preparation_time.toString()} label="Elkészítési ido:" name="preparation_time" type="number" />
                        </div>
                        <div className="w-max">
                            <DifficultySelection />
                            <CategorySelection />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xl text-gray-500" htmlFor="x">Leírás:</label>
                        <textarea rows={200} defaultValue={recipeData.description} className="bg-white w-[100%] h-52   rounded-md border-2 border-black p-2 text-lg text-black" name="description"></textarea>
                    </div>
                    <div className="w-max mt-10 mb-10">
                        <ImageUploader defaultImg={typeof recipeData.image === "string" ? recipeData.image : undefined} onChange={handleImageChange} selectedImageUrl={imageUrl} />
                    </div>
                </div>
                <div className="flex flex-col gap-10">
                    <IngredientCreation defaulVal={ingredients} ingredientsChange={changeIngredientsHandle} />
                </div>
            </div>}
            {isFetching && <h1 className="text-xl">Loading...</h1>}
        </div>

        <button className="mt-5 bg-green-800 p-2 text-xl font-bold rounded-lg shadow-md">Kuldes</button>
    </Form>

}

export default EditRecipePage


