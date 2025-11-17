import type { MouseEvent } from 'react';
import { Button as MuiButton } from "@mui/material";

import { useUtils } from "@/hooks";

interface ButtonProps {
    children?: React.ReactNode;
    icon?: React.ReactElement;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ children, icon, onClick }) => {
    const { isMobile } = useUtils();

    return (<>
        {isMobile && (
            <MuiButton
                size='small'
                variant="contained"
                onClick={onClick}
            >
                {children}
            </MuiButton>
        )}
        {!isMobile && (
            <MuiButton
                size='small'
                variant="contained"
                startIcon={icon}
                onClick={onClick}
            >
                {children}
            </MuiButton>
        )}
    </>)

}

export default Button;