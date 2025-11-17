import * as Yup from 'yup';

import type { SongServiceInterface } from "@/types/services";
import type { Note, Song } from "@/types/entities";

import { SongRepository } from "../repositories";
import { ErrorMessages, ErrorMessageTypes } from "../constant";

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
        const song = await this.repo.findById(songId);

        const validationSchema = Yup.object().shape({
            name: Yup.string()
                .min(2, 'Name must have at least 2 characters!')
                .max(50, 'Name exceeds limit 50 characters!')
                .required('Name of Song is required!'),
            description: Yup.string()
                .max(500, 'Description exceeds limit 500 characters!')
                .optional(),
            totalDuration: Yup.number()
                .min(10, 'Duration required at least 10 seconds!')
                .max(300, 'Duration exceeds limit 300s!')
                .typeError('Duration must be a number!')
                .required('Duration is required!'),
            tags: Yup.array()
                .of(Yup.string()
                    .max(20, 'Tag exceeds limit 20 characters!')
                    .required('Tag Required'),
                )
                .optional(),
            trackLabels: Yup.array()
                .min(1, 'Track Labels must contain at least one item!')
                .max(8, 'Maximum is 8 items!')
                .of(Yup.string()
                    .max(10, 'Max length is 10 characters!')
                    .required('TrackLabel is required!'),
                )
                .required('TrackLabel is required!'),
        }).required();
        const parsedData = JSON.parse(data);

        // Throw on the first error or collect and return all
        const validatedData = await validationSchema.validate(parsedData, { abortEarly: false });

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
            data = {
                ...song,
                notes: [
                    ...song.notes.map((note, index) => noteIndex === index ? newData : note),
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