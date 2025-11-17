import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

export const mainTheme = createTheme({
    palette: {
        primary: grey,
        secondary: grey,
        background: {
            paper: grey[50],
        },
    },
    typography: {
        body2: {
            color: grey[500],
            fontSize: '0.8rem',
        },
    },
    components: {
        MuiSkeleton: {
            defaultProps: {
                animation: 'wave',
            },
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    backgroundColor: grey[200],
                    '&.MuiTableCell-head.major-cell': {
                        backgroundColor: grey[500],
                        color: '#fff'
                    },
                    '&.MuiTableCell-body': {
                        backgroundColor: grey[50],
                        borderBottom: 'none',
                    },
                    '&.MuiTableCell-body.major-cell': {
                        backgroundColor: grey[200],
                    },
                }
            }
        },
    }
});