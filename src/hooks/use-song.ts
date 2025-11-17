import { useEffect, useState } from "react";
import { debounce, type DebouncedFunc } from "lodash";

import type { Note, Song } from "@/types/entities";
import { SongService } from "@/lib/services";
import { getErrorMessage } from "@/lib/utils";

export interface UseSongValues {
    song: Song | null;
    loading: boolean;
    error: string | null;
    loadSong: DebouncedFunc<() => Promise<void>>;
    saveSong: (id: string, data: Omit<Song, "id" | "notes">) => Promise<void>;
    saveNote: (songId: string, oldData: Note | null, newData: Note) => Promise<void>;
    deleteNote: (songId: string, noteData: Note) => Promise<void>;
    deleteSong: (id: string) => Promise<void>;
}

export const useSong = (songId: string | undefined): UseSongValues => {
    const service = new SongService();
    const [song, setSong] = useState<Song | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const debounceLoadSong = debounce(loadSong, 500);
    async function loadSong() {
        if (!songId) {
            return
        }

        setLoading(true);
        setError(null);
        try {
            const song = await service.getDetail(songId);
            setSong(song);
        } catch (err) {
            setError(getErrorMessage(err, "Failed to get song detail."));
        } finally {
            setLoading(false);
        }
    }

    async function saveSong(id: string, data: Omit<Song, "id" | "notes">) {
        setLoading(true);
        setError(null);
        try {
            const updatedSong = await service.update(id, data);
            setSong(updatedSong);
        } catch (err) {
            setError(getErrorMessage(err, "Failed to udpate song."));
        } finally {
            setLoading(false);
        }
    }

    async function deleteSong(id: string) {
        setLoading(true);
        setError(null);
        try {
            await service.delete(id);
            setSong(null);
        } catch (err) {
            setError(getErrorMessage(err, "Failed to delete song."));
        } finally {
            setLoading(false);
        }
    }

    async function saveNote(songId: string, oldData: Note | null, newData: Note) {
        setLoading(true);
        setError(null);
        try {
            const song = await service.saveNote(songId, oldData, newData);
            setSong(song);
        } catch (err) {
            setError(getErrorMessage(err, "Failed to save note."));
            throw(error);
        } finally {
            setLoading(false);
        }
    }

    async function deleteNote(songId: string, noteData: Note) {
        setLoading(true);
        setError(null);
        try {
            const song = await service.deleteNote(songId, noteData);
            setSong(song);
        } catch (err) {
            setError(getErrorMessage(err, "Failed to delete note."));
            throw(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        debounceLoadSong();
    }, [songId]);

    return {
        song,
        loading,
        error,
        loadSong: debounceLoadSong,
        saveSong,
        saveNote,
        deleteNote,
        deleteSong
    }
}
