import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

import type { BaseRepositoryInterface } from "@/types/repositories";
import { AvailableTableName, ErrorMessages, ErrorMessageTypes } from "../constant";
import { DELAY_TIME_LOADING } from '@/lib/config';


type ItemType<T> = (T & { id: string }) | null;
type RawResponseType<T> = (T & { id: string, createdAt: string, updatedAt: string });

export abstract class BaseRepository<T> implements BaseRepositoryInterface<T> {
    abstract table: AvailableTableName;
    protected delayTimeDemo = DELAY_TIME_LOADING;

    find(): Promise<T[]> {
        return new Promise<T[]>((resolve) => {
            const listString = localStorage.getItem(this.table);
            const list: T[] = listString ? JSON.parse(listString) : [];

            setTimeout(function () {
                return resolve(list);
            }, this.delayTimeDemo);
        });
    }

    findById(id: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const listString = localStorage.getItem(this.table);
            const list: ItemType<T>[] = listString ? JSON.parse(listString) : [];
            const result = list.find(obj => obj?.id === id);

            if (!result) {
                return reject(ErrorMessages[ErrorMessageTypes.not_found]);
            }

            setTimeout(() => {
                return resolve(result);
            }, this.delayTimeDemo);
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

            setTimeout(() => {
                return resolve(item);
            }, this.delayTimeDemo);
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

            let result: T;
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

            setTimeout(() => {
                return resolve(result);
            }, this.delayTimeDemo);
        });
    }

    async rawUpdate(id: string, params: Partial<T>): Promise<T> {
        const listString = localStorage.getItem(this.table);
        const list: RawResponseType<T>[] = listString ? JSON.parse(listString) : [];
        const index = list.findIndex(obj => obj?.id === id);

        if (index == -1) {
            throw Error(ErrorMessages[ErrorMessageTypes.not_found]);
        }

        let result: Partial<T>;
        const updatedList = [
            ...list.map(obj => {
                if (obj?.id === id) {
                    result = {
                        ...params,
                        id: obj.id,
                        createdAt: obj.createdAt,
                        updatedAt: moment.now()
                    };
                    return result;
                }
                return obj
            }),
        ];
        localStorage.setItem(this.table, JSON.stringify(updatedList));

        return await this.findById(id);
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

            setTimeout(() => {
                return resolve(null)
            }, this.delayTimeDemo);
        });
    }
}