import type React from "react";
import moment from 'moment';
import { Box, Chip, Grid, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import type { Song } from "@/types/entities";
import { useUtils } from "@/hooks";

import Button from '@/shared-components/Button';

interface SongManagementProps {
    song: Song;
    onOpenIOBtnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onEditSongBtnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SongManagement: React.FC<SongManagementProps> = ({ song, onOpenIOBtnClick, onEditSongBtnClick }) => {
    const { isMobile } = useUtils();

    const gridTemplateAreas = !isMobile ?
        `
            "main main main action"
            "contain contain contain contain"
        ` :
        `
            "main main main main"
            "contain contain contain contain"
            ". . . action"
        `;

    return (<>
        <Box
            className='select-none'
            sx={{ mb: 3 }}>

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
                    <Typography gutterBottom variant="h5" component="div" sx={{ mb: 0 }}>
                        {song.name}
                    </Typography>
                </Box>
                <Box sx={{ gridArea: 'action', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        sx={{ mr: 1 }}
                        variant='outlined'
                        onClick={onOpenIOBtnClick}
                    >
                        {isMobile ? 'I/O' : 'Import/Export'}
                    </Button>
                    <Button
                        icon={<EditIcon />}
                        onClick={onEditSongBtnClick}
                    >
                        {isMobile ? 'Edit' : 'Edit Song'}
                    </Button>
                </Box>
                <Box sx={{ gridArea: 'contain' }}>
                    <Typography variant='body2'>
                        duration - {song.totalDuration}s
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        last modified - {moment(song.updatedAt).fromNow()}
                    </Typography>

                    <Grid container spacing={1}>
                        {song?.tags && song?.tags.map((tag, index) =>
                            <Grid key={index}>
                                <Chip
                                    sx={{ borderRadius: 1, pr: 1 }}
                                    variant="outlined"
                                    label={`${tag}`}
                                    size="small"
                                />
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Box>
        </Box>

        <Box sx={{ mb: 5 }}>
            <Typography variant="body1" sx={{
                whiteSpace: 'pre-wrap',
            }}>
                {song.description}
            </Typography>
        </Box>

    </>)
};

export default SongManagement;