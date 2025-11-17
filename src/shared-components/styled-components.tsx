import { styled } from '@mui/material/styles';
import {
    Card as MuiCard,
    Button as MuiButton
} from '@mui/material';

export const Card = styled(MuiCard)(({ theme }) => ({
    '&.MuiCard-root:hover': {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.secondary.light,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        '& .MuiChip-label': {
            color: theme.palette.secondary.light,
        },
        '& .MuiDivider-root': {
            borderColor: theme.palette.secondary.light,
        },
        '& .MuiIconButton-root': {
            color: theme.palette.secondary.light,
        },
        '& .MuiTypography-root': {
            color: theme.palette.secondary.light,
        }
    },
}));

export const Button = styled(MuiButton)(({ theme }) => ({
    '&.MuiButton-root:hover': {
        color: theme.palette.secondary.light,
    }
}));
