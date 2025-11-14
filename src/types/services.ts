import type { Song } from "./entities";

export interface BaseServiceInterface<T> {
    list(
        page: number,
        perPage: number
    ): Promise<T[]>;
    findById(
        songId: string
    ): Promise<T>;
    create(
        data: Omit<T, "id">,
    ): Promise<T>;
    update (
        jobId: string,
        data: Partial<T>
    ): Promise<T>;
}

export interface SongServiceInterface extends BaseServiceInterface<Song> {}