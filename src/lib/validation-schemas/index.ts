import * as Yup from 'yup';

import type { Song } from '@/types/entities';

export const validateImportSong = async (data: string): Promise<Omit<Song, "id" | "createdAt" | "updatedAt">> => {
        const parsedData = JSON.parse(data);
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
            notes: Yup.array()
                .of(Yup.object().shape({
                    track: Yup.number()
                        .min(1, 'Note Track required at least 1!')
                        .max(parsedData.trackLabels?.length, `Note track is out of TrackLabels. Maximum is ${parsedData.trackLabels?.length}!`)
                        .required('Note Track Required'),
                    time: Yup.number()
                        .min(0, 'Note time required at least 0s!')
                        .max(parsedData.totalDuration??0, `The duration of song is ${parsedData.totalDuration??0}s!`)
                        .test(
                            'time-step',
                            'Time step is 0.5s!',
                            (value) => (value as number) % 0.5 === 0
                        )
                        .required('Note time is required!'),
                    title: Yup.string()
                        .max(50, 'TrackTitle exceeds limit 50 characters!')
                        .optional(),
                    description: Yup.string()
                        .max(500, 'TrackTitle exceeds limit 500 characters!')
                        .optional(),
                    color: Yup.string()
                        .max(50, 'TrackColor exceeds limit 50 characters!')
                        .optional(),
                    icon: Yup.string()
                        .max(50, 'TrackIcon exceeds limit 50 characters!')
                        .optional(),
                }).required('Required'))
                .optional(),
        }).required();

        // Throw on the first error or collect and return all
        return await validationSchema.validate(parsedData, { abortEarly: false });
};