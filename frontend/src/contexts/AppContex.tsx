import { createContext, FC, ReactNode, useState, useCallback, useEffect } from "react";

type UserType = {
    username: string,
    token: string
}

type ContextType = {
    user: UserType | null
    loginUser: (username: string, token: string) => void
    recipeId: number | undefined,
    setRecipeId: (id: number) => void
    isModalOpen: boolean
    openModal: (message: string) => void
    closeModal: () => void
    modalMessage: string | undefined

}

export const AppContext = createContext<ContextType>({
    user: null,
    loginUser: () => { },
    recipeId: undefined,
    setRecipeId: () => { },
    isModalOpen: false,
    openModal: () => { },
    closeModal: () => { },
    modalMessage: undefined
})

const AppContextProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<UserType | null>(null)
    const [recipeId, setRecipeId] = useState<number | undefined>(undefined)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMessage, setModalMessage] = useState<string | undefined>(undefined)

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const username = sessionStorage.getItem('username');

        if (token && username) {
            setUser({ username: username, token: token });
        }
    }, []); // Empty dependency array to run once after initial render

    const loginUser = useCallback((username: string, token: string) => {
        setUser({ username: username, token: token });
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('username', username);
    }, []);

    const setRecipe = (id: number) => {
        setRecipeId(id);
    }

    const openModal = (message: string) => {
        setIsModalOpen(true);
        setModalMessage(message);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const ctxValue: ContextType = {
        user: user,
        loginUser: loginUser,
        recipeId: recipeId,
        setRecipeId: setRecipe,
        openModal: openModal,
        closeModal: closeModal,
        isModalOpen: isModalOpen,
        modalMessage: modalMessage
    }

    return <AppContext.Provider value={ctxValue}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider;
