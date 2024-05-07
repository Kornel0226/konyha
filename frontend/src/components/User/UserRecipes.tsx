import { FC } from "react";
import { Recipe } from "../../requests/recipes";
import { useNavigate } from "react-router-dom";
import RecipeItem from "../Recipes/RecipeItem";
import plus from "../../assets/plus.png.png"

const UserRecipes: FC<{ recipes: Recipe[], deleteRecipe: (recipe_id: number) => void }> = ({ recipes, deleteRecipe }) => {
    //200x 304
    const navigate = useNavigate()

    return <div className="bg-orange-300 min-h-[100vh] h-[115vh] p-10">
        <h1 className="text-[3rem] lg:text-[5rem] lg:text-left text-orange-500 font-bold mb-10">Recepteim</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-10 lg:gap-2">
            {recipes.map(recipe => <RecipeItem isOwn={true} key={recipe.recipe_id} deleteRecipe={() => deleteRecipe(recipe.recipe_id)} recipe={recipe} />)}
            <button onClick={() => navigate("új")} className=" w-full lg:w-[200px] lg:h-[304px] rounded-xl bg-orange-600 flex flex-col text-center items-center hover:transform hover:scale-110 transition-transform duration-300 ease-in-out" ><img className="size-52" src={plus} alt="add" />
                <p className="text-center text-2xl pb-2 lg:text-4xl font-semibold">Új recept</p></button>
        </div>
    </div>
}

export default UserRecipes;