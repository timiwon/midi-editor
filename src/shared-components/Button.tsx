import type { MouseEvent } from 'react';

import { useUtils } from "@/hooks";

import {
    Button as StyledButton
} from "./styled-components"

interface ButtonProps {
    children?: React.ReactNode;
    icon?: React.ReactElement;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ children, icon, onClick }) => {
    const { isMobile } = useUtils();

    return (<>
        {isMobile && (
            <StyledButton
                size='small'
                variant="contained"
                onClick={onClick}
            >
                {children}
            </StyledButton>
        )}
        {!isMobile && (
            <StyledButton
                size='small'
                variant="contained"
                startIcon={icon}
                onClick={onClick}
            >
                {children}
            </StyledButton>
        )}
    </>)

}

export default Button;