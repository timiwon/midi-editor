import React, { useContext } from 'react';
import * as Yup from 'yup';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';

import type { Song } from '@/types/entities';

import { Input, NumberInput, AutocompleteChip } from '@/shared-components/form';
import SongTrackLabelsField from './SongTrackLabelsField';
import SongsContext from '../home/SongsContext';
import SongContext from '../song/SongContext';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Required at least 2 characters!')
        .max(50, 'Max length is 50 characters!')
        .required('Required'),
    description: Yup.string()
        .max(500, 'Max length is 500 characters!')
        .optional(),
    totalDuration: Yup.number()
        .min(10, 'Required at least 10 seconds!')
        .max(300, 'Maximum is 300s!')
        .typeError('Duration must be a number!')
        .required('Required'),
    tags: Yup.array()
        .of(Yup.string()
            .max(20, 'Max length is 20 characters!')
            .required('Required'),
        )
        .optional(),
    trackLabels: Yup.array()
        .min(1, 'Track Labels must contain at least one item!')
        .max(8, 'Maximum is 8 items!')
        .of(Yup.string()
            .max(10, 'Max length is 10 characters!')
        )
        .required('Required'),
}).required();

export type FormValues = {
    name: string;
    description?: string;
    totalDuration: number;
    tags?: string[];
    trackLabels: (string | undefined)[];
};
interface SongFormProps {
    data: Song | null;
    onSubmit: (values: Omit<Song, "id" | "notes">) => void;
}
const SongForm: React.FC<SongFormProps> = ({
    data,
    onSubmit
}) => {
    const { loading } = useContext(SongsContext);
    const songContext = useContext(SongContext);

    const methods = useForm({
        defaultValues: {
            name: data ? data.name : '',
            description: data ? data.description : '',
            totalDuration: data ? data.totalDuration : 0,
            tags: data ? data.tags : undefined,
            trackLabels: data ? data.trackLabels : []
        },
        mode: 'onChange',
        resolver: yupResolver(validationSchema)
    });

    async function handleSubmit(values: FormValues) {
        /**
         *  Solution for validate array item with not allow empty string
         * 
         *  trackLabels: Yup.array()
         *      ...
         *      .of(Yup.string()
         *          // we cannot add .min here 
         *          .max(10, 'Max length is 10 characters!')
         *      )
         *      .required('Required'),
         */
        const newData = values.trackLabels.filter(Boolean) // remove items that are empty strings from trackLabels
        methods.setValue('trackLabels', newData)
        const isValid = await methods.trigger('trackLabels', { shouldFocus: true });

        if (!isValid) {
            return;
        }

        const newValues = {
            ...values,
            trackLabels: methods.getValues('trackLabels')
        }

        onSubmit(newValues as Omit<Song, "id" | "notes">);
    }

    return (
        <FormProvider {...methods}>
            <Input name="name" label="Name" />
            <Input name="description" label="Description" minRows={4} maxRows={6}/>
            <NumberInput name="totalDuration" label="Duration" />
            <AutocompleteChip name="tags" label="Tags" options={['super junior', 'd. dragon', 'britney spears']}/>
            <SongTrackLabelsField />
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <Button
                    disabled={loading || songContext.loading}
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={methods.handleSubmit(handleSubmit)}
                >
                    {loading || songContext.loading ? 'Saving...' : 'Save'}
                </Button>
            </Box>
        </FormProvider>
    );
};

export default SongForm;