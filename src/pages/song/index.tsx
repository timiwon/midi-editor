import { useEffect, useState, createContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import type { Note, Song } from '@/types/entities';
import { useSong, type UseSongValues } from '@/hooks';
import { PATH } from '@/lib/paths';

import MainBlock from '@/shared-components/MainBlock';
import ErrorDialog from '@/shared-components/modals/ErrorDialog';
import ActionToolbar from './components/ActionToolbar';
import NoteModal from './components/NoteModal';
import NoteContainer from './components/NoteContainer';
import SongManagement from './components/SongManagement';
import SongManagementSkeleton from './components/SongManagementSkeleton';
import NoteContainerSkeleton from './components/NoteContainerSkeleton';


export const SongContext = createContext<Partial<UseSongValues>>({
    song: null,
    error: null,
    saveSong: async (id: string, data: Omit<Song, "id" | "notes">) => {},
    saveNote: async (songId: string, oldData: Note | null, newData: Note) => {}
});

function SongPage() {
    const navigate = useNavigate();
    const { songId } = useParams();
    const { song, error, saveSong, saveNote, deleteNote } = useSong(songId);

    const [isOpenNoteModal, setIsOpenNoteModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isOpenErrorDialog, setIsOpenErrorDialog] = useState(false);

    useEffect(() => {
        if (!isOpenErrorDialog) {
            return
        }

        if (!song) {
            navigate(PATH.HOME);
        }
    }, [isOpenErrorDialog]);

    useEffect(() => {
        setIsOpenErrorDialog(Boolean(error))
    }, [error]);

    function handleAddNoteClick() {
        setIsOpenNoteModal(true);
        setSelectedNote(null);
    }

    async function handleSaveNote(data: Note) {
        try {
            await saveNote(songId as string, selectedNote, data);
            setIsOpenNoteModal(false);
            setSelectedNote(null);
        } catch (error) {
            // do nothing
        }
    }

    return (
        <SongContext.Provider value={{
            song, error, saveSong, saveNote, deleteNote
        }}>
            <Box>
                {/** Song Management */}
                <MainBlock sx={{ mt: 0, mb: 10 }}>
                    {!song && <SongManagementSkeleton />}
                    {song && <SongManagement song={song} onSaveSong={saveSong} />}
                </MainBlock>

                {/** Notes Management */}
                <MainBlock>
                    {/** Action Toolbar */}
                    <ActionToolbar onAddNoteBtnClick={handleAddNoteClick} />

                    {/** Notes Display */}
                    {!song && <NoteContainerSkeleton />}
                    {song && <NoteContainer song={song} />}
                </MainBlock>

                {/** Modal for create/update note */}
                {song && <NoteModal
                    open={isOpenNoteModal}
                    data={selectedNote}
                    maxTime={song.totalDuration}
                    title={selectedNote ? 'Edit Note' : 'Add Note'}
                    onClose={() => {
                        setIsOpenNoteModal(false);
                        setSelectedNote(null);
                    }}
                    onSave={handleSaveNote}
                />}

                <ErrorDialog
                    open={isOpenErrorDialog}
                    title="Failed"
                    content={error as string}
                    onClose={() => setIsOpenErrorDialog(false)}
                />
            </Box>
        </SongContext.Provider>
    );
}

export default SongPage