import type { Song } from "./entities";

export interface BaseServiceInterface<T> {
    getList(
        page: number,
        perPage: number
    ): Promise<T[]>;
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

export interface SongServiceInterface extends BaseServiceInterface<Song> {
    create(
        data: Omit<Song, "id" | "notes" | "trackLabels">,
    ): Promise<Song>;
}