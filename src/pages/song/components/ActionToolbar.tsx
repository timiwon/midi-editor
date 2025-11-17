import React from 'react';
import type { MouseEvent } from 'react';
import { Box, List, ListItem, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import { useUtils } from "@/hooks";

import Button from "@/shared-components/Button";

interface ActionToolbarProps {
    onAddNoteBtnClick: (e: MouseEvent<HTMLButtonElement>) => void;
}
const ActionToolbar: React.FC<ActionToolbarProps> = ({
    onAddNoteBtnClick,
}) => {
    const { isMobile } = useUtils();

    const gridTemplateAreas = !isMobile ?
        `
            "main main . sidebar"
            "content content content content"
        ` :
        `
            "main main main main"
            "content content content content"
            ". . . sidebar"
        `;

    return (
        <Box
            className='select-none'
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 1,
                gridTemplateRows: 'auto',
                gridTemplateAreas,
                mb: 2
            }}
        >
            <Box sx={{ gridArea: 'main' }}>
                <Typography variant="h5" gutterBottom>
                    Notes Management
                </Typography>
            </Box>
            <Box sx={{
                gridArea: 'sidebar',
                display: 'flex',
                justifyContent: 'flex-end',
            }}>
                <Button
                    icon={<AddIcon/>}
                    onClick={onAddNoteBtnClick}
                >
                    {isMobile ? 'Create' : 'Create Note'}
                </Button>
            </Box>
            <Box sx={{ gridArea: 'content' }}>
                <List sx={{ listStyleType: 'disc', ml: 5 }}>
                    <ListItem sx={{ py: 0, display: 'list-item' }}>
                        Click directly on node for editing
                    </ListItem>
                    <ListItem sx={{ py: 0, display: 'list-item' }}>
                        Click on blank time for adding new note at that point
                    </ListItem>
                </List>

            </Box>
        </Box>

    )
}

export default ActionToolbar