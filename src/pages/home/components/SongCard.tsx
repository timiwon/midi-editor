import React from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Card, Chip, Divider, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';

import type { Song } from "@/types/entities";
import { PATH } from "@/lib/paths";

interface SongCardProps {
    data: Song
    onEditClick: () => void;
    onDeleteClick: () => void;
}
const SongCard: React.FC<SongCardProps> = ({
    data,
    onEditClick,
    onDeleteClick
}) => {
    const navigate = useNavigate();
    const theme = useTheme();

    function handleEditClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        onEditClick();
    }

    function handleDeleteClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        onDeleteClick();
    }

    return (
        <Card
            className="mb-5 w-full md:w-1/2 cursor-pointer"
            sx={{
                '&:hover': {
                    bgcolor: theme.palette.primary.light,
                    color: '#fff',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    '& .MuiChip-label': {
                        color: '#fff',
                    },
                    '& .MuiDivider-root': {
                        borderColor: '#fff'
                    },
                    '& .MuiIconButton-root': {
                        color: '#fff'
                    }
                },
            }}
            onClick={() => navigate(PATH.SONG_DETAIL.replace(':songId', data.id))}
        >
            <Box sx={{ p: 2 }}>
                <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {data.name}
                    </Typography>
                    <Chip
                        className="select-none"
                        sx={{borderRadius: 1}}
                        variant="outlined"
                        label={`${data.totalDuration}s`}
                        size="medium"
                    />
                </Stack>
                <Typography variant="body2">
                    {data.description}
                </Typography>
            </Box>


            {data.trackLabels && data.trackLabels.length > 0 && (<>
                <Box sx={{ p: 2 }}>
                    <Stack direction="row" spacing={1}>
                        {data.trackLabels.map((track, index) =>
                            <Chip
                                key={index}
                                sx={{borderRadius: 1}}
                                color="primary"
                                label={track}
                                size="small"
                            />
                        )}
                    </Stack>
                </Box>
            </>)}

            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                <IconButton onClick={handleDeleteClick}>
                    <Delete />
                </IconButton>
                <IconButton onClick={handleEditClick}>
                    <Edit />
                </IconButton>
            </Box>
        </Card>
    );
};

export default SongCard;