import { useEffect, useState } from "react"
import { getRecipes, Recipe } from "../requests/recipes"
import RecipesFilter, { FilterObject } from "../components/Recipes/RecipesFilter"
import RecipeItem from "../components/Recipes/RecipeItem"
import { useLocation, useNavigate } from "react-router-dom"

const Recipes = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [filters, setFilters] = useState<object | null>(null)
    const navigate = useNavigate();
    const location = useLocation()




    useEffect(() => {
        async function fetchRecipes() {
            const searchParams = new URLSearchParams(location.search)
            const category = searchParams.get("category")
            const difficulty_level = searchParams.get("difficulty_level")
            const min = searchParams.get("prep_min")
            const max = searchParams.get("prep_max")

            let queries = "?";

            if (category && category !== "any") {
                queries += "category_id=" + category + "&";
            }
            if (difficulty_level && difficulty_level !== "any") {
                queries += "difficulty_level=" + difficulty_level + "&";
            }
            if (min) {
                queries += "prep_min=" + min + "&";
            }
            if (max) {
                queries += "prep_max=" + max;
            }

            console.log(queries)
            const recipes = await getRecipes(queries);
            setRecipes(recipes);
            console.log(recipes);
        }

        fetchRecipes();
    }, [location.search]);



    const handleFilters = (filterObject: FilterObject) => {
        setFilters(filterObject)
        let queries = "?"

        if (filterObject.category != "any") {
            queries += "category=" + filterObject.category
        }
        if (filterObject.difficulty_level != "any") {
            queries += "&difficulty_level=" + filterObject.difficulty_level
        }
        if (filterObject.preparation_time) {
            if (filterObject.preparation_time.min) {
                queries += "&" + "prep_min=" + filterObject.preparation_time.min
            }
            if (filterObject.preparation_time.max) {
                queries += "&" + "prep_max=" + filterObject.preparation_time.max
            }
        }

        console.log(queries);
        navigate(queries);
    }
    return (
        <div className="w-full flex flex-col sm:flex-row min-h-[100vh]">
            <RecipesFilter onSubmit={handleFilters} />
            <div className="bg-orange-300  min-h-[100vh] w-[100vw] p-10 pt-20">
                <h1 className="text-5xl text-orange-500 font-bold mb-10">Receptek</h1>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                    {recipes.length !== 0 && recipes.map(recipe => <RecipeItem key={recipe.recipe_id} recipe={recipe} />)}
                    {recipes.length === 0 && <h1>Nincs találat</h1>}
                </div>
            </div>
        </div>
    );

}

export default Recipes