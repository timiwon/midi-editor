import React from "react"
import type { MouseEvent } from "react";
import { Box } from "@mui/material"

import type { Song } from '@/types/entities';

import BaseModal from "@/shared-components/modals/BaseModal";
import SongForm from "./SongForm";

interface SongModalProps {
    open: boolean;
    onClose: (e: MouseEvent<HTMLButtonElement>) => void; 
}
const SongModal: React.FC<SongModalProps> = ({open, onClose}) => {
    function handleSubmit (values: Omit<Song, "id" | "notes" | "trackLabels">) {
        console.log(values);
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