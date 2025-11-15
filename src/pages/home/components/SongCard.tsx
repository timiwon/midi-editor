import React from "react";
import { Box, Card, Chip, Divider, IconButton, Stack, Typography } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';

import type { Song } from "@/types/entities";

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
    return (
        <Card className="mb-5 w-full md:w-1/2">
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
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
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
                <IconButton onClick={onDeleteClick}>
                    <Delete />
                </IconButton>
                <IconButton onClick={onEditClick}>
                    <Edit />
                </IconButton>
            </Box>
        </Card>
    );
};

export default SongCard;