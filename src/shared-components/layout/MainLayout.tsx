import React from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Facebook, Instagram, LibraryMusic, LinkedIn, Twitter, YouTube } from '@mui/icons-material';

import { mainTheme } from '@/lib/themes';
import { PATH } from '@/lib/paths';
import { useUtils } from '@/hooks';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

const MainLayout: React.FC<LayoutProps> = ({ children, title = 'MIDI - EDITOR' }) => {
    const navigate = useNavigate();
    const { isMobile } = useUtils();
    const logoUrl = "/midi-logo.svg";
    const gridTemplateAreas = !isMobile ?
        `
            "logo title title title title title"
            "logo content content content content content"
            "logo content content content content content"
            "logo footer footer footer footer footer"
        ` : `
            "logo logo title title title title"
            "logo logo footer footer footer footer"
        `;

    return (
        <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <AppBar
                    position="fixed"
                    sx={{
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        zIndex: 1,
                    }}
                >
                    <Toolbar
                        sx={{
                            minHeight: '220px',
                            alignItems: 'flex-start',
                            bgcolor: mainTheme.palette.primary.dark
                        }}
                        variant='dense'
                    >
                        <Container
                            maxWidth={false}
                        >
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(6, 1fr)',
                                    gridTemplateRows: 'auto',
                                    gridTemplateAreas,
                                }}
                            >
                                <Box sx={{ gridArea: 'logo' }}>
                                    <img className='w-50 cursor-pointer' src={logoUrl} loading="lazy" onClick={() => navigate(PATH.HOME)} />
                                </Box>
                                <Box className='mt-2 lg:mt-11' sx={{ gridArea: 'title', display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h5" sx={{mb:0}} color='background.paper'>
                                        Welcome to {title}
                                    </Typography>
                                </Box>
                                <Box sx={{ gridArea: 'content' }}>
                                    {!isMobile && <Typography variant="body1" align="justify" color='background.paper'>
                                        MIDI Editor - a web application similar to a piano roll MIDI editor where users can create, visualize, and manage musical notes placed at specific time points across multiple tracks (similar to FL Studio, Ableton Live, or GarageBand's piano roll view).
                                    </Typography>}
                                </Box>
                                <Box className="mt-10" sx={{ gridArea: 'footer', display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                    <Instagram sx={{ color: mainTheme.palette.background.paper }}/>
                                    <LinkedIn sx={{ color: mainTheme.palette.background.paper }}/>
                                    <LibraryMusic sx={{ color: mainTheme.palette.background.paper }}/>
                                    <YouTube sx={{ color: mainTheme.palette.background.paper }}/>
                                    <Twitter sx={{ color: mainTheme.palette.background.paper }} />
                                    <Facebook sx={{ color: mainTheme.palette.background.paper }} />
                                </Box>
                            </Box>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container
                    className='max-w-full lg:max-w-[1416px]'
                    maxWidth={false}
                    sx={{
                        zIndex: 2,
                        flexGrow: 1,
                        pt: 1,
                        mt: isMobile ? 15 : 25,
                        mb: 1,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        bgcolor: mainTheme.palette.background.default
                    }}
                >
                    {children}
                </Container>
            </Box>
        </ThemeProvider>
    )
};

export default MainLayout;