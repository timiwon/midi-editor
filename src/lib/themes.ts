import { createTheme } from '@mui/material/styles';

const toneColor = {
    light: '#F8F4E8',
    main: '#A1A67C',
    dark: '#70845F',
};
const tableColor = {
    light: '#738A6E',
    main: '#CFE1B9',
    dark: '#344C3D'
}
export const mainTheme = createTheme({
    palette: {
        primary: toneColor,
        secondary: toneColor,
        background: {
            default: '#FFEDD0',
            paper: '#FFF',
        },
    },
    typography: {
        body2: {
            color: toneColor.dark,
            fontSize: '0.8rem',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#FFF',
                },
            },
        },
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
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#000',
                    '&.MuiButton-contained:hover': {
                        color: '#FFF'
                    }
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    backgroundColor: tableColor.main,
                    '&.MuiTableCell-head.major-cell': {
                        backgroundColor: tableColor.dark,
                        color: '#fff'
                    },
                    '&.MuiTableCell-head': {
                        backgroundColor: tableColor.light,
                        color: '#fff'
                    },
                    '&.MuiTableCell-body': {
                        backgroundColor: tableColor.main,
                        borderBottom: 'none',
                    },
                    '&.MuiTableCell-body.major-cell': {
                        backgroundColor: "#E9F5DB",
                    },
                }
            }
        },
    }
});