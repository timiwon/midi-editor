import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import type { Song } from "@/types/entities";
import { useSongs } from "@/hooks";

import MainBlock from "@/shared-components/MainBlock";
import PageDescription from "@/shared-components/PageDescription";
import ConfirmDialog from "@/shared-components/modals/ConfirmDialog";
import ErrorDialog from "@/shared-components/modals/ErrorDialog";
import ActionToolbar from "./components/ActionToolbar";
import SongModal from "./components/SongModal";
import SongCard from "./components/SongCard";
import EmptyStorage from "@/shared-components/EmptyStorage";
import SongCardSkeleton from "./components/SongCardSkeleton";

function Home() {
    const {
        loading,
        error,
        songs,
        loadSongs,
        createSong,
        saveSong,
        deleteSong
    } = useSongs();

    const [isOpenSongModal, setIsOpenSongModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);
    const [isOpenConfirmDeleteDialog, setIsOpenConfirmDeleteDialog] = useState(false);
    const [isOpenErrorDialog, setIsOpenErrorDialog] = useState(false);

    useEffect(() => {
        setIsOpenErrorDialog(Boolean(error))
    }, [error])

    function closeErrorDialog() {
        setIsOpenErrorDialog(false);
    }

    function hanleCreateBtnClick() {
        setSelectedSong(null);
        setIsOpenSongModal(true);
    }

    function handleSearch(value: string) {
        loadSongs(value);
    }

    function handleEditBtnClick(data: Song) {
        setSelectedSong(data);
        setIsOpenSongModal(true);
    }

    function handleOnSaveSongModal(data: Omit<Song, "id" | "notes">) {
        if (selectedSong) {
            return saveSong(selectedSong.id, data);
        }

        createSong(data)
        return;
    }

    function handleDeleteBtnClick(data: Song) {
        setSelectedSong(data);
        setIsOpenConfirmDeleteDialog(true);
    }

    function handleDeleteSong() {
        if (!selectedSong)
            return

        deleteSong(selectedSong.id)
        setSelectedSong(null)
        setIsOpenConfirmDeleteDialog(false);
    }

    function handleCancelDeleteSong() {
        setSelectedSong(null);
        setIsOpenConfirmDeleteDialog(false);
    }

    return (
        <Box>
            {/** page description */}
            <PageDescription
                title="Welcome to MIDI"
                content="MIDI Editor - a web application similar to a piano roll MIDI editor where users can create, visualize, and manage musical notes placed at specific time points across multiple tracks (similar to FL Studio, Ableton Live, or GarageBand's piano roll view)."
            />

            {/** Songs Management */}
            <MainBlock>
                {/** Action toolbar */}
                <ActionToolbar
                    onCreateBtnClick={hanleCreateBtnClick}
                    onSearch={handleSearch}
                />

                {/** List Songs */}
                <Box sx={{ mt: 5 }}>
                    {loading && songs.length > 0 && songs.map((song) =>
                        <SongCardSkeleton key={song.id} />
                    )}
                    {loading && songs.length <= 0 && [1, 2].map((index) =>
                        <SongCardSkeleton key={index} />
                    )}
                    {!loading && (<>
                        {(!songs || songs.length <= 0) && <EmptyStorage />}
                        {songs && songs.length > 0 && songs.map((song, index) =>
                            <SongCard
                                key={index}
                                data={song}
                                onEditClick={() => handleEditBtnClick(song)}
                                onDeleteClick={() => handleDeleteBtnClick(song)}
                            />
                        )}
                    </>)}
                </Box>
            </MainBlock>


            <SongModal
                open={isOpenSongModal}
                data={selectedSong}
                title={selectedSong ? 'Edit Song' : 'Create Song'}
                onClose={() => {
                    setIsOpenSongModal(false);
                    setSelectedSong(null);
                }}
                onSave={handleOnSaveSongModal}
            />

            <ConfirmDialog
                open={isOpenConfirmDeleteDialog}
                title={`Delete - ${selectedSong?.name}`}
                description="Delete Action will remove this song out of storage and can not recover it."
                onCancel={handleCancelDeleteSong}
                onOk={handleDeleteSong}
            />
            <ErrorDialog
                open={isOpenErrorDialog}
                title="Failed"
                content={error as string}
                onClose={closeErrorDialog}
            />
        </Box>
    )
};

export default Home