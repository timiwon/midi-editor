import { useEffect, useState } from "react";
import { debounce } from "lodash";

import type { Song } from "@/types/entities";
import { SongService } from "@/lib/services";
import { getErrorMessage } from "@/lib/utils";

export function useSong(songId: string | undefined) {
    const service = new SongService();
    const [song, setSong] = useState<Song | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        debounceLoadSong();
    }, [songId]);

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

    return {
        song,
        loading,
        error,
        loadSong: debounceLoadSong,
        saveSong,
        deleteSong
    }
}
