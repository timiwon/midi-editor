import React from 'react';
import type { ReactNode } from 'react';
import { Box } from "@mui/material";
import type { SxProps } from "@mui/material";

interface MainBlockProps {
    children: ReactNode;
    sx?: SxProps
}

const MainBlock: React.FC<MainBlockProps> = ({ children, sx }) => (
    <Box sx={{
        mt: 2,
        ...sx
    }}>
        {children}
    </Box>
)

export default MainBlock