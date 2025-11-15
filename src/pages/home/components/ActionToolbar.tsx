import React from 'react';
import type { MouseEvent } from 'react';
import { Box, Button, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { useUtils } from "@/hooks/use-utils";

interface ActionToolbarProps {
    onCreateBtnClick: (e: MouseEvent<HTMLButtonElement>) => void; 
}
const ActionToolbar: React.FC<ActionToolbarProps> = ({
    onCreateBtnClick
}) => {
    const { isMobile } = useUtils();

    const gridTemplateAreas = !isMobile ? 
        `"main main . sidebar"` :
        `
            "main main main main"
            ". . . sidebar"
        `;

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 1,
                gridTemplateRows: 'auto',
                gridTemplateAreas,
            }}
        >
            <Box sx={{ gridArea: 'main' }}>
                <Typography variant="h5" gutterBottom>
                    Songs Management
                </Typography>
                <Typography variant="body1" align='justify'>
                    Create, edit, delete, and list MIDI songs/sequences
                </Typography>

            </Box>
            <Box sx={{
                gridArea: 'sidebar',
                display: 'flex',
                justifyContent: 'flex-end',
            }}>
                <CreateButton onClick={onCreateBtnClick}/>
            </Box>
        </Box>
    )
}

interface CreateButtonProps {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}
const CreateButton: React.FC<CreateButtonProps> = ({onClick}) => {
    const { isMobile } = useUtils();

    return (<>
        {isMobile && (
            <Button
                size='small'
                variant="contained"
                onClick={onClick}
            >
                Create
            </Button>
        )}
        {!isMobile && (
            <Button
                size='small'
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onClick}
            >
                Create Song
            </Button>
        )}
    </>)

}

export default ActionToolbar