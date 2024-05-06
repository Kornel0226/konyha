import { FC, useEffect, useState } from "react"
import getIngredients, { Ingredient } from "../../requests/ingredient"
import IngredientDetail from "./IngredientDetail"

const IngredientDetails: FC<{ recipe_id: number }> = ({ recipe_id }) => {
    const [Ingredients, setIngredients] = useState<Ingredient[] | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<object | string | undefined>(undefined)

    useEffect(() => {
        async function fetchIngredients() {
            try {
                const ingredients = await getIngredients(recipe_id)
                setIngredients(ingredients)
            } catch (error) {
                setError({ error: error })
            }
            setIsLoading(false)
        }

        fetchIngredients()
    }, [recipe_id])

    return <div className="border-l-2 border-b-2 p-4 rounded-lg border-orange-700">
        <h2 className="lg:text-[5rem] text-[3rem] font-semibold text-orange-700">Hozzávalók:</h2>
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>Error</h1>}
        {Ingredients && Ingredients.map(ingredient => <IngredientDetail key={ingredient.ingredient_id} ingredient={ingredient} />)}
    </div>
}

export default IngredientDetails;