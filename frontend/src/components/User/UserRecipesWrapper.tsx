import { FC, useEffect, useState } from "react"
import { getAuthenticatedUserRecipes } from "../../requests/user"

import { deleteRecipe, Recipe } from "../../requests/recipes";
import UserRecipes from "./UserRecipes";

const UserRecipesWrapper: FC<{ token: string }> = ({ token }) => {


    const [recipes, setRecipes] = useState<Recipe[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchUserData = async (token: string) => {
            try {
                const data = await getAuthenticatedUserRecipes(token);
                setRecipes(data);
            } catch (error) {
                setError("Error fetching user data");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) {
            fetchUserData(token);
        } else {
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);


    const handleRemoveRecipe = async (recipe_id: number) => {

        setRecipes((prev) => {
            if (!prev) {
                return prev
            }
            return prev.filter((recipe) => recipe.recipe_id !== recipe_id)
        })

        try {
            await deleteRecipe(token, recipe_id)
            return
        } catch (error) {
            setRecipes(recipes);
        }
    }

    return <div className="flex-1">
        {error && <p>error</p>}
        {isLoading && <p>Loading...</p>}
        {recipes && <UserRecipes deleteRecipe={handleRemoveRecipe} recipes={recipes} />}

    </div>
}

export default UserRecipesWrapper;
