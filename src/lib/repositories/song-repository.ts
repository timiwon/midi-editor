import moment from "moment";

import type { Song } from "@/types/entities";
import type { SongRepositoryInterface } from "@/types/repositories";

import { BaseRepository } from '@/lib/repositories';
import { AvailableTableName } from "../constant";

export class SongRepository extends BaseRepository<Song> implements SongRepositoryInterface {
    public table = AvailableTableName.songs;

    getList(searchValue: string): Promise<Song[]> {
        return new Promise<Song[]>(async (resolve) => {
            const list: Song[] = await this.find();

            setTimeout(function () {
                return resolve(list.filter(item =>
                    item.name.includes(searchValue) ||
                    item.description?.includes(searchValue) ||
                    item.tags?.join(', ').includes(searchValue)
                ));
            }, this.delayTimeDemo);
        });
    }
}