import { createContext } from "react";
import type { Song, Note } from '@/types/entities';
import type { UseSongValues } from '@/hooks';

const SongContext = createContext<Partial<UseSongValues>>({
    loading: false,
    song: null,
    error: null,
    // eslint-disable-next-line
    saveSong: async (id: string, data: Omit<Song, "id" | "notes">) => {},
    // eslint-disable-next-line
    saveNote: async (songId: string, oldData: Note | null, newData: Note) => {},
    // eslint-disable-next-line
    deleteNote: async (songId: string, noteData: Note) => {}
});

export default SongContext;
