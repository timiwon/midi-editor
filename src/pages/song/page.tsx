import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import type { Note } from '@/types/entities';
import { useSong } from '@/hooks';
import { PATH } from '@/lib/paths';

import MainBlock from '@/shared-components/MainBlock';
import ErrorDialog from '@/shared-components/modals/ErrorDialog';
import ActionToolbar from './components/ActionToolbar';
import NoteModal from './components/NoteModal';
import NoteContainer from './components/NoteContainer';
import SongManagement from './components/SongManagement';
import SongManagementSkeleton from './components/SongManagementSkeleton';
import NoteContainerSkeleton from './components/NoteContainerSkeleton';
import SongContext from './SongContext';

function SongPage() {
    const navigate = useNavigate();
    const { songId } = useParams();
    const { song, error, saveSong, saveNote, deleteNote } = useSong(songId);

    const [isOpenNoteModal, setIsOpenNoteModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isOpenErrorDialog, setIsOpenErrorDialog] = useState(false);

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
            console.log(error)
            // do nothing
        }
    }

    if (isOpenErrorDialog && !song) {
        navigate(PATH.HOME);
    }

    useEffect(() => {
        setIsOpenErrorDialog(Boolean(error))
    }, [error]);

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