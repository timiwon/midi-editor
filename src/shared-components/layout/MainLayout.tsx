import React from 'react';
import type { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { mainTheme } from '@/lib/themes';
import { PATH } from '@/lib/paths';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

const MainLayout: React.FC<LayoutProps> = ({ children, title = 'MIDI - EDITOR' }) => {
    const navigate = useNavigate();
        
    return (
        <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <AppBar position="fixed" color='primary'>
                    <Toolbar>
                        <Typography className='select-none cursor-pointer' variant="h6" onClick={() => navigate(PATH.HOME)}>
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container component="main" sx={{ flexGrow: 1, pt: 10 }}>
                    {children}
                </Container>
            </Box>
        </ThemeProvider>
    )
};

export default MainLayout;