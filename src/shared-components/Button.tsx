import type { MouseEvent } from 'react';

import { useUtils } from "@/hooks";

import {
    Button as StyledButton
} from "./styled-components"
import type { ButtonPropsColorOverrides, ButtonPropsVariantOverrides, SxProps } from '@mui/material';
import type { OverridableStringUnion } from '@mui/types';


interface ButtonProps {
    children?: React.ReactNode;
    icon?: React.ReactElement;
    sx?: SxProps;
    variant?: OverridableStringUnion<"text" | "outlined" | "contained", ButtonPropsVariantOverrides>;
    size?: OverridableStringUnion<"small" | "medium" | "large", ButtonPropsVariantOverrides>;
    color?: OverridableStringUnion<"inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning", ButtonPropsColorOverrides>;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

;
const Button: React.FC<ButtonProps> = ({
    children,
    icon,
    onClick,
    sx,
    color,
    variant = 'contained',
    size = 'small',
}) => {
    const { isMobile } = useUtils();

    return (<>
        {isMobile && (
            <StyledButton
                sx={{
                    ...sx
                }}
                color={color}
                size={size}
                variant={variant}
                onClick={onClick}
            >
                {children}
            </StyledButton>
        )}
        {!isMobile && (
            <StyledButton
                sx={{
                    ...sx
                }}
                color={color}
                size={size}
                variant={variant}
                startIcon={icon}
                onClick={onClick}
            >
                {children}
            </StyledButton>
        )}
    </>)

}

export default Button;