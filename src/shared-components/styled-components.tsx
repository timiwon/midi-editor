import { styled } from '@mui/material/styles';
import {
    Card as MuiCard,
} from '@mui/material';

export const Card = styled(MuiCard)(({ theme }) => ({
    transition: 'transform 0.3s ease-in-out, boxShadow 0.3s ease-in-out',
    color: theme.palette.text.primary,
    '&:hover': {
        transform: 'translateY(-5px) scale(1.02)',
        boxShadow: 10,
    },
}));
