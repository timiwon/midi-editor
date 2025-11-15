import { useMediaQuery, useTheme } from '@mui/material';

export function useUtils() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))

    return {
        isMobile,
        isTablet,
        isLargeScreen
    }
}