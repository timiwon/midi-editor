import type { SongServiceInterface } from "@/types/services";
import { SongRepository } from "../repositories";
import type { Song } from "@/types/entities";

export class SongService implements SongServiceInterface {
    protected repo = new SongRepository();

    async getList(searchValue: string) {
        const results = await this.repo.getList(searchValue);
        return results;
    }

    async getDetail(songId: string): Promise<Song> {
        const song = await this.repo.findById(songId);
        return song;
    }

    async create(data: Omit<Song, "id" | "notes" | "trackLabels">): Promise<Song> {
        const song = await this.repo.create(data as Song);
        return song;
    }

    async update(songId: string, data: Partial<Song>): Promise<Song> {
        const song = await this.repo.updateById(songId, data);
        return song;
    }

    async delete(songId: string) {
        return await this.repo.delete(songId);
    }
}