import { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import getCategories, { CategoriesType } from "../../requests/categories";
import { Form } from "react-router-dom";

export type FilterObject = {
    category: string,
    difficulty_level: string
    preparation_time: {
        min: string | undefined
        max: string | undefined
    } | undefined
}

const RecipesFilter: FC<{ onSubmit: (filterObject: FilterObject) => void }> = ({ onSubmit }) => {
    const [categories, setCategories] = useState<CategoriesType[] | null>(null);
    const [isTimeFilter, setIsTimeFilter] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const minRef = useRef<HTMLInputElement>(null)
    const maxRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 768);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    let timeClasses: string

    if (!isTimeFilter) {
        timeClasses = "pointer-events-none opacity-50 cursor-not-allowed hover:bg-gray-300"
    } else {
        timeClasses = ""
    }

    const handleOnCheckChange = () => {
        if (isTimeFilter) {
            setIsTimeFilter(false)
            if (minRef.current) {
                minRef.current.value = ""
            }
            if (maxRef.current) {
                maxRef.current.value = ""
            }

        }
        else if (!isTimeFilter) {
            setIsTimeFilter(true);
        }
    }

    useEffect(() => {
        async function fetchcategories() {
            try {
                const fetchedCategories = await getCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                console.log(error);
            }
        }

        fetchcategories();
    }, [])

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        const formElement = event.target as HTMLFormElement;
        const formData = new FormData(formElement);

        const category = formData.get("category");
        const diffulty_level = formData.get("difficulty_level");
        const preparation_time = {
            min: formData.get("min")?.toString() === "" ? undefined : formData.get("min")?.toString(),
            max: formData.get("max")?.toString() === "" ? undefined : formData.get("max")?.toString()
        }

        if (!category || !diffulty_level || !preparation_time) {
            return;
        }
        const filterObject: FilterObject = {
            category: category.toString(),
            difficulty_level: diffulty_level.toString(),
            preparation_time: preparation_time.min || preparation_time.max ? preparation_time : undefined
        }

        if (isFiltersOpen) {
            setIsFiltersOpen(false);
        }

        onSubmit(filterObject);
    }

    const toggleFilters = () => {
        setIsFiltersOpen(!isFiltersOpen);
    }

    return (
        <>
            {!isMobile && (
                <Form onSubmit={handleSubmit} className="bg-green-800 w-[20%] h-[100vh]">
                    <h1 className="text-3xl font-bold p-3 border-l-2 border-b-2 border-black">Szűrők</h1>
                    <ul className="flex flex-col text-3xl">
                        <li className="p-4 border-2 border-t-0 border-black">
                            <div className="flex flex-col gap-5">
                                <label htmlFor="diff">Nehézség</label>
                                <select name="difficulty_level" className="bg-white text-black" id="diff">
                                    <option value="any">Mind</option>
                                    <option value="EASY">Konnyu</option>
                                    <option value="MEDIUM">Kozepes</option>
                                    <option value="HARD">Nehéz</option>
                                </select>
                            </div>
                        </li>
                        <li className="p-4 border-2 border-t-0 border-black">
                            <div className="flex flex-col gap-5">
                                <label htmlFor="cat">Kategória</label>
                                <select name="category" className="bg-white text-black w-full" id="cat">
                                    <option value="any">Mind</option>
                                    {categories && categories.map(category => <option key={category.category_id} value={category.category_id}>{category.name}</option>)}
                                </select>
                            </div>
                        </li>
                        <li className="p-4 border-2 border-t-0 border-black">
                            <div>
                                <h2>Elkészítési ido</h2>
                                <input type="checkbox" onChange={handleOnCheckChange} />
                                <div className={timeClasses}>
                                    <div className="flex flex-col gap-3 mb-5">
                                        <label className="text-2xl" htmlFor="max">Minimum</label>
                                        <input type="number" ref={minRef} className="bg-white text-black w-full" name="min" id="max" />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label htmlFor="max" className="text-2xl">Maxiumum</label>
                                        <input type="number" ref={maxRef} className="bg-white text-black w-full" name="max" id="max" />
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <button>SZURES</button>
                </Form>
            )}

            {isMobile && (
                <div className="relative "> {/* Increase z-index value */}
                    <button className=" absolute mt-4 ml-4 bg-green-800 p-2 rounded-md text-black" onClick={toggleFilters}> {/* Increase z-index value */}
                        {isFiltersOpen ? 'Szűrők bezárása' : 'Szűrők megnyitása'}
                    </button>
                    <div className="top-1 left-0 h-max w-full bg-green-900 absolute" hidden={!isFiltersOpen}> {/* Increase z-index value */}
                        <Form onSubmit={handleSubmit} className="h-full">
                            <ul className="flex flex-col text-3xl">
                                <li className="p-4">
                                    <div className="flex flex-col">
                                        <label htmlFor="diff" className="text-white text-lg">Nehézség</label>
                                        <select name="difficulty_level" className="bg-white text-black w-[100%]" id="diff">
                                            <option value="any">Mind</option>
                                            <option value="EASY">Konnyu</option>
                                            <option value="MEDIUM">Kozepes</option>
                                            <option value="HARD">Nehéz</option>
                                        </select>
                                    </div>
                                </li>
                                <li className="p-4 ">
                                    <div className="flex flex-col">
                                        <label htmlFor="cat" className="text-white text-lg">Kategória</label>
                                        <select name="category" className="bg-white text-black w-[100%]" id="cat">
                                            <option value="any">Mind</option>
                                            {categories && categories.map(category => <option key={category.category_id} value={category.category_id}>{category.name}</option>)}
                                        </select>
                                    </div>
                                </li>
                                <li className="p-4 ">
                                    <div>
                                        <h2 className="text-white">Elkészítési ido</h2>
                                        <input type="checkbox" onChange={handleOnCheckChange} />
                                        <div className={timeClasses}>
                                            <div className="flex flex-col">
                                                <label htmlFor="max" className="text-white">Minimum</label>
                                                <input type="number" ref={minRef} className="bg-white text-black w-[10vh]" name="min" id="max" />
                                            </div>
                                            <div className="flex flex-col">
                                                <label htmlFor="max" className="text-white">Maxiumum</label>
                                                <input type="number" ref={maxRef} className="bg-white text-black w-[10vh]" name="max" id="max" />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div className="flex flex-row ">
                                <button className="text-white w-1/2 bg-orange-700 p-2">Szűrés</button>
                                <button type="button" onClick={() => setIsFiltersOpen(false)} className="text-white w-1/2 bg-red-700 p-2">Bezárás</button>
                            </div>
                        </Form>
                    </div>

                </div>
            )}

        </>
    );
}

export default RecipesFilter;
