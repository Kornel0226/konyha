import { createContext, FC, ReactNode, useState, useCallback } from "react";

type UserType = {
    username: string,
    token: string
}

type ContextType = {
    user: UserType | null
    loginUser: (username: string, token: string) => void
    recipeId: number | undefined,
    setRecipeId: (id: number) => void
}

export const AppContext = createContext<ContextType>({
    user: null,
    loginUser: () => { },
    recipeId: undefined,
    setRecipeId: () => { }
})

const AppContextProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<UserType | null>(null)
    const [recipeId, setRecipeId] = useState<number | undefined>(undefined)

    const loginUser = useCallback((username: string, token: string) => {
        setUser({ username: username, token: token })
    }, [])

    const setRecipe = (id: number) => {
        setRecipeId(id)
    }
    const ctxValue: ContextType = {
        user: user,
        loginUser: loginUser,
        recipeId: recipeId,
        setRecipeId: setRecipe
    }

    return <AppContext.Provider value={ctxValue}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider;