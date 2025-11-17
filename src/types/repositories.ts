import type { Song } from "./entities";

export type BaseRepositoryInterface<T> = {
    find(): Promise<T[]>;
    findById(id: string): Promise<T>;
    create(params: T): Promise<T>;
    updateById(id: string, params: Partial<T>): Promise<T>;
    delete(id: string): void;
    rawUpdate(id: string, params: Partial<T>): Promise<T>;
}

export type SongRepositoryInterface = BaseRepositoryInterface<Song> & {
    getList(searchValue: string): Promise<Song[]>;
    rawUpdate(id: string, params: Partial<Song>): Promise<Song>;
};
