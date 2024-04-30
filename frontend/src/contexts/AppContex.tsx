import React, { createContext, FC, ReactNode, useState } from "react";

type Auth = undefined | "login" | "register" | "loggedIn"

type ContextType = {
    auth: Auth,
    setAuth: React.Dispatch<React.SetStateAction<Auth>>
}

export const AppContext = createContext<ContextType>({
    auth: undefined,
    setAuth: () => { }
})

const AppContextProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [Auth, setAuth] = useState<Auth>(undefined)

    const ctxValue: ContextType = {
        auth: Auth,
        setAuth: setAuth
    }

    return <AppContext.Provider value={ctxValue}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider;