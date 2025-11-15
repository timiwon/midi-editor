import type { Song } from "./entities";

export type BaseRepositoryInterface<T> = {
    findById: (id: string) => Promise<T>;
    getList: () => Promise<T[]>;
    create: (params: T) => Promise<T>;
    updateById: (id: string, params: Partial<T>) => Promise<T>;
    delete: (id: string) => void;
}

export type SongRepositoryInterface = BaseRepositoryInterface<Song>;
