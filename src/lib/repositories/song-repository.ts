import type { Song } from "@/types/entities";
import type { SongRepositoryInterface } from "@/types/repositories";
import { BaseRepository } from '@/lib/repositories';
import { AvailableTableName } from "../constant";

export class SongRepository extends BaseRepository<Song> implements SongRepositoryInterface {
    public table = AvailableTableName.songs;
}