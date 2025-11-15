import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

interface ErrorDialogProps {
    open: boolean;
    title: string;
    content: string;
    onClose: () => void;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({
    open,
    title,
    content,
    onClose
}) => {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <Alert severity="error" sx={{bgcolor: theme.palette.background.paper}}>
                <AlertTitle>{title}</AlertTitle>
                {content}
            </Alert>
            <DialogActions>
                <Button onClick={onClose} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ErrorDialog