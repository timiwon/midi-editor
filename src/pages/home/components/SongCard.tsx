import React from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Card, Chip, Divider, Grid, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';

import type { Song } from "@/types/entities";
import { PATH } from "@/lib/paths";
import moment from "moment";

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
            <Box sx={{ pt: 2, pr: 2, pl: 2 }}>
                <Box sx={{ mb: 2 }}>
                    <Stack
                        direction="row"
                        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <Typography gutterBottom variant="h5" component="div" sx={{ mb: 0 }}>
                            {data.name}
                        </Typography>
                        <Chip
                            className="select-none"
                            sx={{ borderRadius: 1 }}
                            variant="outlined"
                            label={`${data.totalDuration}s`}
                            size="medium"
                        />
                    </Stack>
                    <Grid container spacing={1}>
                        {data.tags && data.tags.map(tag =>
                            <Grid>
                                <Chip
                                    className="select-none"
                                    sx={{ borderRadius: 1, pr: 1 }}
                                    variant="outlined"
                                    label={`${tag}`}
                                    size="small"
                                />
                            </Grid>
                        )}
                    </Grid>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        last modified - {moment(data.updatedAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">
                        {data.description}
                    </Typography>
                </Box>


                {data.trackLabels && data.trackLabels.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                        <Stack direction="row" spacing={1}>
                            {data.trackLabels.map((track, index) =>
                                <Chip
                                    key={index}
                                    sx={{ borderRadius: 1 }}
                                    color="primary"
                                    label={track}
                                    size="small"
                                />
                            )}
                        </Stack>
                    </Box>
                )}

                <Divider />
                <Grid container>
                    <Grid
                        size={{ xs: 12, sm: 6 }}
                        sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant="body2">{moment(data.createdAt).format('DD-MM-YYYY')}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={handleDeleteClick}>
                            <Delete />
                        </IconButton>
                        <IconButton onClick={handleEditClick}>
                            <Edit />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
};

export default SongCard;