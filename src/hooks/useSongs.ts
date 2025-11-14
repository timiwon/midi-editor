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

    async function createSong(params: Omit<Song, "id" | "notes" | "trackLabels">) {
        setLoading(true);
        setError(null);
        try {
            const song = await service.create(params);
            setSongs((prev) => [song, ...prev]);
        } catch (err) {
            setError(getErrorMessage(err, "Failed to create song."));
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
        createSong
    }
}