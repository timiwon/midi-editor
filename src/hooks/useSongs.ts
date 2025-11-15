import { useEffect, useState } from "react";
import { debounce } from "lodash";

import type { Song } from "@/types/entities";
import { SongService } from "@/lib/services";
import { getErrorMessage } from "@/lib/utils";

export function useSongs() {
    const service = new SongService();
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const debounceLoadSongs = debounce(loadSongs, 500);
    async function loadSongs(page: number, perPage: number) {
        setLoading(true);
        setError(null);
        try {
            const list = await service.getList(page, perPage);
            setSongs(list);
        } catch (err) {
            setError(getErrorMessage(err, "Failed to get songs."));
        } finally {
            setLoading(false);
        }
    }

    async function createSong(params: Omit<Song, "id" | "notes">) {
        setLoading(true);
        setError(null);
        try {
            const song = await service.create(params);
            setSongs((prev) => [...prev, song]);
        } catch (err) {
            setError(getErrorMessage(err, "Failed to create song."));
        } finally {
            setLoading(false);
        }
    }

    async function saveSong(id: string, data: Omit<Song, "id" | "notes">) {
        setLoading(true);
        setError(null);
        try {
            const updatedSong = await service.update(id, data);
            setSongs(songs.map(item => item.id === id ? updatedSong : item));
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

            const index = songs.findIndex(item => item.id === id)

            if (index === -1) {
                return;
            }

            let newList = [...songs];
            delete newList[index]
            setSongs(newList.filter(Boolean));
        } catch (err) {
            setError(getErrorMessage(err, "Failed to delete song."));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        debounceLoadSongs(1, 500);
    }, []);

    return {
        songs,
        loading,
        error,
        loadSongs: debounceLoadSongs,
        createSong,
        saveSong,
        deleteSong
    }
}