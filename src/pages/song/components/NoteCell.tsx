import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";

import type { Note } from "@/types/entities";

import SongContext from "../SongContext";
import NoteModal from "./NoteModal";
import NotePoint from "./NotePoint";

interface NoteCellProps {
    trackIndex: number;
    rangeTime: number[];
    notes: Note[];
    mainCell: {
        width: number,
        height: number
    };
}

const NoteCell: React.FC<NoteCellProps> = ({ trackIndex, rangeTime, notes, mainCell }) => {
    const { song, saveNote, deleteNote } = useContext(SongContext);
            
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isOpenNoteModal, setIsOpenNoteModal] = useState(false);
    const [isOpenCreateNoteModal, setIsOpenCreateNoteModal] = useState(false);

    const chunk = {
        length: 10,
        width: mainCell.width/2,
        height: mainCell.height/10
    };

    const list: { [key: number]: Note } = {};
    notes.forEach(note => {
        const index = getNoteChunkIndex(note);
        list[index] = note;
    });

    function getNoteChunkIndex(note: Note) {
        return ((note.time - rangeTime[0]) / 0.5) + 1;
    }

    function handleEditNoteClick(noteData: Note) {
        setSelectedNote({
            track: trackIndex,
            time: noteData.time,
            title: noteData.title,
            description: noteData.description,
            color: noteData.color,
            icon: noteData.icon
        });
        setIsOpenNoteModal(true);
    }

    async function handleEditNote(data: Note) {
        if (!song || !saveNote) {
            return;
        }

        try {
            await saveNote(song.id, selectedNote, data);
            setSelectedNote(null);
            setIsOpenNoteModal(false);
        } catch (error) {
            // do nothing
            console.log(error)
        }
    }

    async function handleBlankTimeInfoClick(time: number) {
        setSelectedNote({
            track: trackIndex,
            time: time,
            title: '',
            description: '',
            color: '',
            icon: ''
        });
        setIsOpenCreateNoteModal(true);
    }
    
    async function handleCreateDataWithTimeInfo(data: Note) {
        if (!song || !saveNote) {
            return;
        }

        try {
            await saveNote(song.id, null, data);
            setSelectedNote(null);
            setIsOpenCreateNoteModal(false);
        } catch (error) {
            // do nothing
            console.log(error)
        }
    }

    async function handleDelete() {
        if (!song || !deleteNote) {
            return
        }

        await deleteNote(song.id, selectedNote as Note);
        setSelectedNote(null);
        setIsOpenNoteModal(false);
    }

    useEffect(() => {
        if (!notes) {
            return
        }

    }, [notes]);

    return (<>
        <Box
            sx={{
                width: `${chunk.height}px`,
                height: '100%',
                //margin: '0 auto',
                cursor: 'pointer'
            }}
        >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(key => 
                <NotePoint
                    key={key}
                    position={key}
                    rangeTime={rangeTime}
                    list={list}
                    chunk={chunk}
                    mainCell={mainCell}
                    onEditNoteClick={handleEditNoteClick}
                    onBlankTimeClick={handleBlankTimeInfoClick}
                />
            )}
        </Box>

        {/**
         * Modal for create note with initial data
         */}
        {song && <NoteModal
            open={isOpenCreateNoteModal}
            data={selectedNote}
            maxTime={song.totalDuration}
            title={'Add Note'}
            onClose={() => {
                setSelectedNote(null);
                setIsOpenCreateNoteModal(false);
            }}
            onSave={handleCreateDataWithTimeInfo}
        />}

        {/**
         * Modal for edit note
         */}
        {song && <NoteModal
            open={isOpenNoteModal}
            data={selectedNote}
            maxTime={song.totalDuration}
            title={'Edit Note'}
            onClose={() => {
                setSelectedNote(null);
                setIsOpenNoteModal(false);
            }}
            onSave={handleEditNote}
            onDelete={handleDelete}
        />}
    </>)
};

export default NoteCell;