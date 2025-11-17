import React from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Chip, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';

import type { Song } from "@/types/entities";
import { PATH } from "@/lib/paths";
import moment from "moment";
import { Card } from "@/shared-components/styled-components";

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
            onClick={() => navigate(PATH.SONG_DETAIL.replace(':songId', data.id))}
        >
            <Box className="select-none" sx={{ pt: 2, pr: 2, pl: 2 }}>
                {/**
                 * Header
                 */}
                <Box sx={{ mb: 3 }}>
                    <Stack
                        direction="row"
                        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <Typography className="truncate" gutterBottom variant="h5" component="div" sx={{ mb: 0 }}>
                            {data.name}
                        </Typography>
                        <Chip
                            sx={{ borderRadius: 1 }}
                            variant="outlined"
                            label={`${data.totalDuration}s`}
                            size="medium"
                        />
                    </Stack>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        last modified - {moment(data.updatedAt).fromNow()}
                    </Typography>

                    <Grid container spacing={1}>
                        {data.tags && data.tags.map(tag =>
                            <Grid key={tag}>
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

                {/**
                 * Description
                 */}
                <Box sx={{ mb: 5 }}>
                    <Typography variant="body1">
                        {data.description}
                    </Typography>
                </Box>


                {/**
                 * Track Labels
                 */}
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

                {/**
                 * Action Bar
                 */}
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