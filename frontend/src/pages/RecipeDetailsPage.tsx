import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipe, Recipe } from "../requests/recipes";
import { getCategory } from "../requests/categories";
import Image from "../components/Recipes/ImageComponent";
import IngredientDetails from "../components/Ingredient/IngredientDetails";

const RecipeDetailsPage = () => {
    const params = useParams<{ recipeId: string }>();
    const recipe_id = params.recipeId;
    const [recipe, setRecipe] = useState<Recipe | undefined>();
    const [category, setCategory] = useState<{ name: string } | undefined>();
    const [error, setError] = useState<Error | object | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchRecipe() {
            if (!recipe_id || isNaN(parseInt(recipe_id))) {
                throw new Error("Invalid recipe ID");
            }
            try {
                const recipeData = await getRecipe(parseInt(recipe_id));
                setRecipe(recipeData);

                if (recipeData.category_id) {
                    const categoryData = await getCategory(recipeData.category_id.toString());
                    setCategory(categoryData);
                }

            } catch (error) {
                setError({ error: error });
            }
            setIsLoading(false);
        }

        fetchRecipe();
    }, [recipe_id]);

    const handleSpecialCharacters = (text: string) => {
        if (!text) return text; // Return if text is empty or undefined

        // Split text into paragraphs based on newline character (\n)
        const paragraphs = text.split("\n");

        // Map each paragraph and wrap it in a <p> tag
        const formattedText = paragraphs.map((paragraph, index) => (
            <p key={index} className="text-xl break-words lg:text-3xl text-white mb-10">
                {paragraph}
            </p>
        ));

        return formattedText;
    };




    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {"Nincs ilyen recept"}</div>;
    }



    return (
        <div className="bg-orange-300 rounded-md w-full min-h-[100vh] flex flex-auto justify-center p-8">
            {recipe && (
                <div className="flex flex-col md:flex-row justify-between w-full">
                    <div className="flex flex-col md:w-2/3">
                        <h2 className="text-4xl lg:text-6xl font-extrabold text-orange-700 mb-8">{recipe.title}</h2>
                        <p className="text-3xl text-orange-700 mb-10">{category && category.name}</p>
                        <div className=" w-full lg:w-[50%]">
                            <Image img={recipe.image} />
                        </div>
                        <p className="text-2xl text-white mb-4">Elkészítési idő: {recipe.preparation_time} perc</p>
                        <p className="text-2xl text-white mb-4">Nehézség: {difficulty(recipe)}</p>
                        <div className="text-3xl text-white mb-8">
                            <h2 className="mb-20 mt-10lg:text-[5rem] text-orange-700 font-black">Leírás</h2>
                            {handleSpecialCharacters(recipe.description)}
                        </div>
                    </div>
                    <div className="md:w-1/3">
                        <IngredientDetails recipe_id={recipe.recipe_id} />
                    </div>
                </div>
            )}
        </div>
    );

}

export default RecipeDetailsPage;


function difficulty(recipe: Recipe) {
    if (recipe) {
        if (recipe.difficulty_level === "EASY") {
            return "Könnyű"
        }
        else if (recipe.difficulty_level === "MEDIUM") {
            return "Közepes"
        }
        else {
            return "Nehéz"
        }
    }
}