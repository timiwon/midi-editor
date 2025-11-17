import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

import type { BaseRepositoryInterface } from "@/types/repositories";
import { AvailableTableName, ErrorMessages, ErrorMessageTypes } from "../constant";


type ItemType<T> = (T & { id: string }) | null;
export abstract class BaseRepository<T> implements BaseRepositoryInterface<T> {
    abstract table: AvailableTableName;
    protected delayTimeDemo = 1000;

    findById(id: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const listString = localStorage.getItem(this.table);
            const list: ItemType<T>[] = listString ? JSON.parse(listString) : [];
            const result = list.find(obj => obj?.id === id);

            if (!result) {
                return reject(ErrorMessages[ErrorMessageTypes.not_found]);
            }

            return resolve(result);
        });
    }

    create(params: T): Promise<T> {
        return new Promise<T>((resolve) => {
            const newUuid = uuidv4();
            const listString = localStorage.getItem(this.table);
            const list: T[] = listString ? JSON.parse(listString) : [];
            const item = {
                ...params,
                id: newUuid,
                createdAt: moment.now(),
                updatedAt: moment.now(),
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
                return reject(ErrorMessages[ErrorMessageTypes.not_found]);
            }

            let result;
            const updatedList = [
                ...list.map(obj => {
                    if (obj?.id === id) {
                        result = {
                            ...obj,
                            ...params,
                            updatedAt: moment.now()
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
            const list: ItemType<T>[] = listString ? JSON.parse(listString) : [];
            const index = list.findIndex(obj => obj?.id === id);

            if (index == -1) {
                return reject(ErrorMessages[ErrorMessageTypes.not_found]);
            }

            list.splice(index, 1)
            localStorage.setItem(this.table, JSON.stringify(list));

            return resolve(null)
        });
    }
}