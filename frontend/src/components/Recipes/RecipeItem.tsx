import { FC } from "react"
import { Recipe } from "../../requests/recipes"
import Image from "./ImageComponent";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContex";
import { useNavigate } from "react-router-dom";

const RecipeItem: FC<{ recipe: Recipe, deleteRecipe: () => void, isOwn: boolean }> = ({ recipe, deleteRecipe, isOwn = false }) => {

    const { setRecipeId } = useContext(AppContext)
    const navigate = useNavigate();


    return (
        <div className="cursor-pointer h-max flex flex-col w-[100%] lg:max-w-[200px] p-1 rounded-xl m-1 bg-orange-600 hover:transform hover:scale-110 transition-transform duration-300 ease-in-out">
            <div className="w-full h-max lg:h-[25vh]" onClick={() => navigate("/receptek/" + recipe.recipe_id)}>
                <Image img={recipe.image} />
                <h2 className="text-center text-xl break-word">{recipe.title}</h2>
            </div>
            <div className="flex flex-row">
                {isOwn && (
                    <button className="m-3 flex-1 bg-green-800 p-2 break-words rounded-md" onClick={() => { setRecipeId(recipe.recipe_id); navigate("modositas") }}>
                        Modositas
                    </button>
                )}
                {isOwn && (
                    <button onClick={deleteRecipe} className="m-3 bg-red-700 p-2 rounded-md">
                        Torles
                    </button>
                )}
            </div>
        </div>
    );

}

export default RecipeItem
