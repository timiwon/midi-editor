import React from 'react';
import type { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink, grey } from '@mui/material/colors';

const customTheme = createTheme({
    palette: {
        primary: pink,
        secondary: pink,
        background: {
            paper: pink[50],
        },
    },
    typography: {
        body2: {
            color: grey[500],
            fontSize: '0.8rem',
        },
    },
    components: {
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
        }
    }
});

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

const MainLayout: React.FC<LayoutProps> = ({ children, title = 'MIDI - EDITOR' }) => (
    <ThemeProvider theme={customTheme}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" sx={{ flexGrow: 1, pt: 10 }}>
                {children}
            </Container>
        </Box>
    </ThemeProvider>
);

export default MainLayout;