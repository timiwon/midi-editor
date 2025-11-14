import React from "react"
import { Box } from "@mui/material"

import type { Song } from '@/types/entities';

import BaseModal from "@/shared-components/modals/BaseModal";
import SongForm from "./SongForm";
import { useSongs } from "@/hooks";

interface SongModalProps {
    open: boolean;
    onClose: () => void; 
}
const SongModal: React.FC<SongModalProps> = ({open, onClose}) => {
    const { createSong } = useSongs();
    function handleSubmit (values: Omit<Song, "id" | "notes" | "trackLabels">) {
        createSong(values);
        onClose();
    }

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title="Text in a modal"
            description="Duis mollis, est non commodo luctus, nisi erat porttitor ligula."
        >
            <Box>
                <SongForm onSubmit={handleSubmit}/>
            </Box>
        </BaseModal>
    )
}

export default SongModal