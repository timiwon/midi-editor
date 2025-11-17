import React, { useContext } from "react"
import { Box } from "@mui/material"

import type { Song } from '@/types/entities';

import BaseModal from "@/shared-components/modals/BaseModal";
import SongForm from "./SongForm";
import SongsContext from "../home/SongsContext";

interface SongModalProps {
    open: boolean;
    title: string;
    data: Song | null;
    onClose: () => void; 
    onSave: (values: Omit<Song, "id" | "notes">) => void;
}
const SongModal: React.FC<SongModalProps> = ({
    open,
    title,
    data,
    onClose,
    onSave
}) => {
    const { loading } = useContext(SongsContext);

    function handleSubmit (values: Omit<Song, "id" | "notes">) {
        onSave(values);
    }

    return (
        <BaseModal
            open={open}
            onClose={loading ? () => {} : onClose}
            title={title}
            description={''}
        >
            <Box>
                <SongForm data={data} onSubmit={handleSubmit}/>
            </Box>
        </BaseModal>
    )
}

export default SongModal