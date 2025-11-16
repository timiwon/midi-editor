import type { Song } from "./entities";

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

export type SongServiceInterface = Omit<BaseServiceInterface<Song>, "getList"> & {
    getList(
        searchValue: string
    ): Promise<Song[]>;
    create(
        data: Omit<Song, "id" | "notes" | "trackLabels">,
    ): Promise<Song>;
}