import { FC } from "react";
import { Ingredient } from "../../requests/ingredient";

const IngredientDetail: FC<{ ingredient: Ingredient }> = ({ ingredient }) => {

    const stringBuilder = () => {
        if (ingredient.quantity === 1 && ingredient.unit) {
            return ingredient.unit + " " + ingredient.name
        }
        if (ingredient.quantity >= 1) {
            return ingredient.quantity.toString() + "x " + ingredient.name
        }
    }
    return <div className="border-b-2 leading-tight border-orange-700 pt-2 pb-2">
        <p className="text-[3rem] text-black">{stringBuilder()}</p>
    </div>
}

export default IngredientDetail;