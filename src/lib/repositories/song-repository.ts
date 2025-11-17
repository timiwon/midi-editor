import moment from "moment";

import type { Song } from "@/types/entities";
import type { SongRepositoryInterface } from "@/types/repositories";

import { BaseRepository } from '@/lib/repositories';
import { AvailableTableName, ErrorMessages, ErrorMessageTypes } from "../constant";

export class SongRepository extends BaseRepository<Song> implements SongRepositoryInterface {
    public table = AvailableTableName.songs;

    getList(searchValue: string): Promise<Song[]> {
        return new Promise<Song[]>((resolve) => {
            const listString = localStorage.getItem(this.table);
            const list: Song[] = listString ? JSON.parse(listString) : [];

            setTimeout(function () {
                return resolve(list.filter(item =>
                    item.name.includes(searchValue) ||
                    item.description?.includes(searchValue) ||
                    item.tags?.join(', ').includes(searchValue)
                ));
            }, this.delayTimeDemo);
        });
    }

    async rawUpdate(id: string, params: Partial<Song>): Promise<Song> {
        const listString = localStorage.getItem(this.table);
        const list: Song[] = listString ? JSON.parse(listString) : [];
        const index = list.findIndex(obj => obj?.id === id);

        if (index == -1) {
            throw Error(ErrorMessages[ErrorMessageTypes.not_found]);
        }

        let result: Partial<Song>;
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
}