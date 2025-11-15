import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import type { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    description: string;
    okBtnLabel?: string;
    cancelBtnLabel?: string;
    onCancel: () => void;
    onOk: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    title,
    description,
    okBtnLabel,
    cancelBtnLabel,
    onCancel,
    onOk
}) => (
        <Dialog
            open={open}
            slots={{
                transition: Transition,
            }}
            keepMounted
            onClose={onCancel}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>{cancelBtnLabel ? cancelBtnLabel : 'Disagree'}</Button>
                <Button onClick={onOk}>{okBtnLabel ? okBtnLabel : 'Agree'}</Button>
            </DialogActions>
        </Dialog>
    );

export default ConfirmDialog