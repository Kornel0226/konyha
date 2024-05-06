import { useEffect, useState } from "react"
import getCategories, { CategoriesType } from "../../requests/categories"
const CategorySelection = () => {

    const [categories, setCategories] = useState<CategoriesType[] | null>(null)
    const [error, setError] = useState<null | unknown>(null)
    const [loading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getCategories();
                setCategories(data)
            } catch (error) {
                setError(error);
            }

            setIsLoading(false);
        }

        fetchCategories();
    }, [])

    return <div className="flex flex-col">
        <label htmlFor="category" className="text-xl text-gray-500">Kategória:</label>
        <select name="category_id" className="bg-white text-md py-0 h-10 rounded-md border-2 border-black p-2 text-lg text-black text-center justify-center">
            {categories && categories.map((category) => <option className="text-left" key={category.category_id} value={category.category_id}>{category.name}</option>)}
        </select>
    </div>
}

export default CategorySelection;