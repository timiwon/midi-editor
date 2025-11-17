import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

export const mainTheme = createTheme({
    palette: {
        primary: blue,
        secondary: blue,
        background: {
            paper: blue[50],
        },
    },
    typography: {
        body2: {
            color: blue[500],
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
                    backgroundColor: blue[200],
                    '&.MuiTableCell-head.major-cell': {
                        backgroundColor: blue[500],
                        color: '#fff'
                    },
                    '&.MuiTableCell-body': {
                        backgroundColor: blue[50],
                        borderBottom: 'none',
                    },
                    '&.MuiTableCell-body.major-cell': {
                        backgroundColor: blue[200],
                    },
                }
            }
        },
    }
});