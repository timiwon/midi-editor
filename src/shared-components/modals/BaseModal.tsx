import React from "react"
import type { ReactNode, MouseEvent } from "react";
import { Box, Modal, Typography, useTheme } from "@mui/material"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.default',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface BaseModalProps {
    open: boolean;
    onClose: (e: MouseEvent<HTMLButtonElement>) => void; 
    title: string;
    description?: string;
    children: ReactNode;
}
const BaseModal: React.FC<BaseModalProps> = ({
    title,
    description,
    open,
    onClose,
    children
}) => {
    const theme = useTheme();

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box>
                    <Typography variant="h6" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2">
                        {description}
                    </Typography>
                </Box>
                <Box sx={{mt: 2}}>
                    {children}
                </Box>
            </Box>
        </Modal>
    )
}

export default BaseModal