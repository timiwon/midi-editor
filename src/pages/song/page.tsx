import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Backdrop, Box, CircularProgress } from '@mui/material';

import type { Song } from "@/types/entities";
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
import IOModal from './components/IOModal';
import SongModal from '../share-feature-components/SongModal';

function SongPage() {
    const navigate = useNavigate();
    const { songId } = useParams();
    const { loading, song, error, saveSong, saveNote, deleteNote, importSong } = useSong(songId);

    const [isOpenNoteModal, setIsOpenNoteModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isOpenErrorDialog, setIsOpenErrorDialog] = useState(false);
    const [isOpenIOModal, setIsOpenIOModal] = useState(false);
    const [isOpenSongModal, setIsOpenSongModal] = useState(false);

    function handleAddNoteClick() {
        setIsOpenNoteModal(true);
        setSelectedNote(null);
    }

    async function handleSaveNote(data: Note) {
        if (!song) {
            return
        }

        try {
            await saveNote(song.id, selectedNote, data);
            setIsOpenNoteModal(false);
            setSelectedNote(null);
        } catch (error) {
            console.log(error)
            // do nothing
        }
    }

    async function handleImportSong(data: string) {
        if (!song) {
            return
        }

        try {
            await importSong(song.id, data);
            setIsOpenIOModal(false);
            setSelectedNote(null);
        } catch (error) {
            // do nothing
        }

    }

    async function handleOnSaveSong(data: Omit<Song, "id" | "notes">) {
        if (!song) {
            return;
        }

        await saveSong(song.id, data);
        setIsOpenSongModal(false);
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
            {loading && <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
                open={true}
                onClick={() => { }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>}
            <Box>
                {/** Song Management */}
                <MainBlock sx={{ mt: 0, mb: 10 }}>
                    {!song && <SongManagementSkeleton />}
                    {song && <SongManagement
                        song={song}
                        onOpenIOBtnClick={() => setIsOpenIOModal(true)}
                        onEditSongBtnClick={() => setIsOpenSongModal(true)}
                    />}
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

            {song && <SongModal
                open={isOpenSongModal}
                data={song}
                title={'Edit Song'}
                onClose={() => {
                    setIsOpenSongModal(false);
                }}
                onSave={handleOnSaveSong}
            />}

            {song && <IOModal
                open={isOpenIOModal}
                data={song}
                onClose={() => {
                    setIsOpenIOModal(false);
                }}
                onSave={handleImportSong}
            />}
        </SongContext.Provider>
    );
}

export default SongPage