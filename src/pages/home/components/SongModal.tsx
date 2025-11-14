import React from "react"
import type { MouseEvent } from "react";
import { Box, Typography } from "@mui/material"

import BaseModal from "@/shared-components/modals/BaseModal";

interface SongModalProps {
    open: boolean;
    onClose: (e: MouseEvent<HTMLButtonElement>) => void; 
}
const SongModal: React.FC<SongModalProps> = ({open, onClose}) => {
    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title="Text in a modal"
            description="Duis mollis, est non commodo luctus, nisi erat porttitor ligula."
        >
            <Box>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    gogo
                </Typography>
            </Box>
        </BaseModal>
    )
}

export default SongModal