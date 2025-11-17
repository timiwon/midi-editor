import React from "react"

import type { Note } from '@/types/entities';

import BaseModal from "@/shared-components/modals/BaseModal";
import NoteForm from "./NoteForm";

interface NoteModalProps {
    open: boolean;
    title: string;
    data: Note | null;
    maxTime: number;
    onClose: () => void; 
    onSave: (values: Note) => void;
    onDelete?: () => void;
}
const NoteModal: React.FC<NoteModalProps> = ({
    open,
    title,
    data,
    maxTime,
    onClose,
    onSave,
    onDelete
}) => {

    function handleSubmit (values: Note) {
        onSave(values);
    }

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={title}
            description={''}
        >
            <NoteForm maxTime={maxTime} data={data} onSubmit={handleSubmit} onDelete={onDelete}/>
        </BaseModal>
    )
}

export default NoteModal