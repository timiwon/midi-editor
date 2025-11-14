import type { Song } from "./entities";

export interface BaseRepositoryInterface<T> {
    findById: (id: string) => Promise<T | null>;
    getList: (page: number, perPage: number) => Promise<T[]>;
    create: (params: Omit<T, "id" | "created_at" | "updated_at" | "owner_id">) => Promise<T>;
    update: (
        id: string,
        updates: Partial<T>
    ) => Promise<T>;
    delete: (
        id: string,
    ) => void;
}

export interface SongRepositoryInterface extends BaseRepositoryInterface<Song> {}
