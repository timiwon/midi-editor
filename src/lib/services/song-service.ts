import type { SongServiceInterface } from "@/types/services";
import type { Note, Song } from "@/types/entities";

import { SongRepository } from "../repositories";
import { ErrorMessages, ErrorMessageTypes } from "../constant";
import { validateImportSong } from "@/lib/validation-schemas";

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

    async importSong(songId: string, data: string): Promise<Song> {
        // validate exists song
        await this.repo.findById(songId);
        
        const validatedData = await validateImportSong(data);

        const result = await this.repo.rawUpdate(songId, validatedData);
        return result;
    }

    async delete(songId: string) {
        return await this.repo.delete(songId);
    }

    async saveNote(songId: string, oldData: Note | null, newData: Note) {
        const song = await this.repo.findById(songId);

        let noteIndex = -1;
        let targetIndex = -1;

        if (song.notes && song.notes.length > 0) {
            targetIndex = song.notes.findIndex(note => note.track === newData.track && note.time === newData.time);

            if (oldData) {
                noteIndex = song.notes.findIndex(note => note.track === oldData.track && note.time === oldData.time);
            }
        }

        // handle update error
        if (newData.time > song.totalDuration) {
            throw new Error(ErrorMessages[ErrorMessageTypes.note_max_duration]);
        }

        if (oldData) {
            if (noteIndex === -1) {
                throw new Error(ErrorMessages[ErrorMessageTypes.not_found]);
            }

            if (noteIndex !== targetIndex && targetIndex !== -1) {
                throw new Error(ErrorMessages[ErrorMessageTypes.duplicate])
            }
        }

        if (!oldData) {
            if (targetIndex !== -1) {
                throw new Error(ErrorMessages[ErrorMessageTypes.duplicate])
            }
        }

        let data = {
            ...song,
            notes: [
                ...(song.notes ? song.notes : []),
                newData
            ]
        };

        if (oldData) {
            const currentNotes = song && song.notes ? song.notes : [];
            data = {
                ...song,
                notes: [
                    ...currentNotes,
                ]
            };
        }

        const result = await this.update(songId, data);
        return result;
    }

    async deleteNote(songId: string, noteData: Note) {
        const song = await this.repo.findById(songId);

        if (!song.notes || song.notes.length <= 0) {
            throw new Error(ErrorMessages[ErrorMessageTypes.not_found]);
        }

        const noteIndex = song.notes.findIndex(note => note.track === noteData.track && note.time === noteData.time);
        if (noteIndex === -1) {
            throw new Error(ErrorMessages[ErrorMessageTypes.not_found]);
        }

        const result = await this.update(songId, {
            ...song,
            notes: [
                ...song.notes.filter((note, index) => noteIndex !== index),
            ]
        });

        return result;
    }
}