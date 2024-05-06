const DifficultySelection = () => {
    return <div className="flex flex-col">
        <label htmlFor="category" className="text-xl text-gray-500">Nehézség:</label>
        <select name="difficulty_level" className="bg-white text-md py-0 h-10 rounded-md border-2 border-black p-2 text-lg text-black text-center justify-center">
            <option className="text-left" value="EASY">Konnyu</option>
            <option className="text-left" value="MEDIUM">Kozepes</option>
            <option className="text-left" value="HARD">Nehez</option>
        </select>
    </div>
}

export default DifficultySelection;