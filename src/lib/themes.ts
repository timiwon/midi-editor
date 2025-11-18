import { createTheme } from '@mui/material/styles';
import { green, grey } from '@mui/material/colors';

const toneColor = green;
export const mainTheme = createTheme({
    palette: {
        primary: {
            light: toneColor[500],
            main: toneColor[900],
            dark: toneColor[900],
        },
        secondary: {
            light: toneColor[100],
            main: toneColor[400],
            dark: toneColor[400],
        },
        background: {
            paper: toneColor[50],
        },
    },
    typography: {
        body2: {
            color: toneColor[900],
            fontSize: '0.8rem',
        },
    },
    components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: grey[100],
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
        MuiTableCell: {
            styleOverrides: {
                root: {
                    backgroundColor: toneColor[200],
                    '&.MuiTableCell-head.major-cell': {
                        backgroundColor: toneColor[500],
                        color: '#fff'
                    },
                    '&.MuiTableCell-body': {
                        backgroundColor: toneColor[50],
                        borderBottom: 'none',
                    },
                    '&.MuiTableCell-body.major-cell': {
                        backgroundColor: toneColor[200],
                    },
                }
            }
        },
    }
});