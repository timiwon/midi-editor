import type React from "react";
import moment from 'moment';
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import type { Song } from "@/types/entities";
import { useUtils } from "@/hooks";

import Button from '@/shared-components/Button';
import SongModal from '@/pages/share-feature-components/SongModal';
import { useState } from "react";

interface SongManagementProps {
    song: Song;
    onSaveSong: (id: string, data: Omit<Song, "id" | "notes">) => Promise<void>;
}

const SongManagement: React.FC<SongManagementProps> = ({ song, onSaveSong }) => {
    const { isMobile } = useUtils();

    const [isOpenSongModal, setIsOpenSongModal] = useState(false);

    function handleOnSaveSong(data: Omit<Song, "id" | "notes">) {
        if (!song) {
            return;
        }

        onSaveSong(song.id, data);
    }

    return (<>
        <Box sx={{ mb: 3 }}>

            <Stack
                direction="row"
                sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
                <Typography gutterBottom variant="h5" component="div" sx={{ mb: 0 }}>
                    {song.name}
                </Typography>
                <Button
                    icon={<EditIcon />}
                    onClick={() => setIsOpenSongModal(true)}
                >
                    {isMobile ? 'Edit' : 'Edit Song'}
                </Button>
            </Stack>
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

        <Box sx={{ mb: 5 }}>
            <Typography variant="body1">
                {song.description}
            </Typography>
        </Box>

        {song && <SongModal
            open={isOpenSongModal}
            data={song}
            title={'Edit Song'}
            onClose={() => {
                setIsOpenSongModal(false);
            }}
            onSave={handleOnSaveSong}
        />}
    </>)
};

export default SongManagement;