import React from 'react';
import type { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { mainTheme } from '@/lib/themes';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

const MainLayout: React.FC<LayoutProps> = ({ children, title = 'MIDI - EDITOR' }) => (
    <ThemeProvider theme={mainTheme}>
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