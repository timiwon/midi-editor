import type { Song } from "./entities";

export interface BaseRepositoryInterface<T> {
    findById: (id: string) => Promise<T>;
    getList: (page: number, perPage: number) => Promise<T[]>;
    create: (params: T) => Promise<T>;
    updateById: (id: string, params: Partial<T>) => Promise<T>;
    delete: (id: string) => void;
}

export interface SongRepositoryInterface extends BaseRepositoryInterface<Song> {}
