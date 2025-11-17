import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";

import type { Note } from "@/types/entities";

import { SongContext } from "..";
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
            
    const [list, setList] = useState<{[key: number]: Note}>({})
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isOpenNoteModal, setIsOpenNoteModal] = useState(false);

    const chunk = {
        length: 10,
        width: mainCell.width/2,
        height: mainCell.height/10
    };

    useEffect(() => {
        let parsedData: {[key: number]: Note} = {};
        notes.forEach(note => {
            const index = getNoteChunkIndex(note);
            parsedData[index] = note;
        });

        setList(parsedData)
    }, [notes]);

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
        }
    }

    return (<>
        <Box
            sx={{
                width: `${chunk.height}px`,
                height: '100%',
                margin: '0 auto',
                cursor: 'pointer'
            }}
        >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(key => 
                <NotePoint
                    key={key}
                    position={key}
                    list={list}
                    chunk={chunk}
                    onEditNoteClick={handleEditNoteClick}
                />
            )}
        </Box>

        {/**
         * Modal for create note with initial data
         */}
        {song && <NoteModal
            open={isOpenNoteModal}
            data={selectedNote}
            maxTime={song.totalDuration}
            title={'Add Note'}
            onClose={() => {
                setSelectedNote(null);
                setIsOpenNoteModal(false);
            }}
            onSave={handleEditNote}
        />}
    </>)
};

export default NoteCell;