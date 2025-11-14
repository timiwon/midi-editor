import { v4 as uuidv4 } from 'uuid';

import type { BaseRepositoryInterface } from "@/types/repositories";
import { AvailableTableName } from "../constant";

type ItemType<T> = (T & { id: string }) | null;
export abstract class BaseRepository<T> implements BaseRepositoryInterface<T> {
    abstract table: AvailableTableName;

    findById(id: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const listString = localStorage.getItem(this.table);
            const list: ItemType<T>[] = listString ? JSON.parse(listString) : [];
            const result = list.find(obj => obj?.id === id);

            if (!result) {
                return reject('not-found');
            }

            return resolve(result);
        });
    }

    getList(page: number, perPage: number): Promise<T[]> {
        return new Promise<T[]>((resolve) => {
            const listString = localStorage.getItem(this.table);
            const list: T[] = listString ? JSON.parse(listString) : [];
            return resolve(list);
        });
    }

    create(params: T): Promise<T> {
        return new Promise<T>((resolve) => {
            const newUuid = uuidv4();
            const listString = localStorage.getItem(this.table);
            const list: T[] = listString ? JSON.parse(listString) : [];
            const item = {
                ...params,
                id: newUuid
            } as T;
            localStorage.setItem('songs', JSON.stringify([
                ...list,
                item
            ]));
            return resolve(item);
        });
    }

    updateById(id: string, params: Partial<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const listString = localStorage.getItem(this.table);
            const list: ItemType<T>[] = listString ? JSON.parse(listString) : [];
            const index = list.findIndex(obj => obj?.id === id);

            if (index == -1) {
                return reject('not-found');
            }

            let result;
            const updatedList = [
                ...list.map(obj => {
                    if (obj?.id === id) {
                        result = {
                            ...obj,
                            ...params
                        };
                        return result; 
                    }
                    return obj
                }),
            ];
            localStorage.setItem(this.table, JSON.stringify(updatedList));
            return resolve(result as T);
        });
    }

    delete(id: string) {
        return new Promise((resolve, reject) => {
            const listString = localStorage.getItem(this.table);
            let list: ItemType<T>[] = listString ? JSON.parse(listString) : [];
            const index = list.findIndex(obj => obj?.id === id);

            if (index == -1) {
                return reject('not-found');
            }

            list.splice(index, 1);
        });
    }
}