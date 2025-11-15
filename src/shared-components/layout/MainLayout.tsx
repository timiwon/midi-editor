import React from 'react';
import type { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

const customTheme = createTheme({
    palette: {
        primary: pink,
        secondary: pink,
        background: {
            paper: pink[50],
        },
    },
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