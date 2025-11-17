import type React from 'react';
import { Typography } from '@mui/material';
import type { SxProps } from '@mui/material/styles';

interface EmojiIconProps {
    unified: string;
    size: number;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    sx?: SxProps
}
const EmojiIcon: React.FC<EmojiIconProps> = ({ unified, size, onClick, sx }) => {
    return (
        <Typography
            sx={sx}
            component={'span'}
            fontSize={size}
            onClick={onClick}
        >{unified}</Typography>
    );
}

export default EmojiIcon;