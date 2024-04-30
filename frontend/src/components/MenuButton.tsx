import { FC, ReactNode } from "react"

type ButtonProps = {
    children: ReactNode
    onClick: () => void
}

const MenuButton: FC<ButtonProps> = ({ onClick, children }) => {
    return <button onClick={onClick}>
        {children}
    </button>
}

export default MenuButton;