import type { Note, Song } from "./entities";

export type BaseServiceInterface<T> = {
    getList(): Promise<T[]>;
    getDetail(
        id: string
    ): Promise<T>;
    create(
        data: Omit<T, "id">,
    ): Promise<T>;
    update (
        id: string,
        data: Partial<T>
    ): Promise<T>;
    delete (
        id: string,
    ): void;
}

export type SongServiceInterface = Omit<BaseServiceInterface<Song>, "getList" | "create"> & {
    getList(
        searchValue: string
    ): Promise<Song[]>;
    create(
        data: Omit<Song, "id" | "notes">,
    ): Promise<Song>;
    importSong(
        songId: string,
        data: string,
    ): Promise<Song>;
    saveNote(
        songId: string,
        oldData: Note,
        newData: Note,
    ): Promise<Song>;
    deleteNote(
        songId: string,
        noteData: Note,
    ): Promise<Song>;
}