import React from 'react';
import * as Yup from 'yup';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Box } from '@mui/material';

import type { Song } from '@/types/entities';

import { Input, NumberInput, AutocompleteChip } from '@/shared-components/form';
import SongTrackLabelsField from './SongTrackLabelsField';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Required at least 2 characters!')
        .max(50, 'Max length is 50 characters!')
        .required('Required'),
    description: Yup.string()
        .min(2, 'Required at least 2 characters!')
        .max(500, 'Max length is 500 characters!')
        .required('Required'),
    totalDuration: Yup.number()
        .min(10, 'Required at least 10 seconds!')
        .max(300, 'Maximum is 300s!')
        .typeError('Duration must be a number!')
        .required('Required'),
    tags: Yup.array()
        .min(1, 'Tags must contain at least one item!')
        .max(8, 'Maximum is 8 items!')
        .required('Required'),
    trackLabels: Yup.array()
        .min(1, 'Track Labels must contain at least one item!')
        .max(8, 'Maximum is 8 items!')
        .of(Yup.string()
            .max(10, 'Max length is 10 characters!')
        )
        .required('Required'),
});

export type FormValues = {
    name: string;
    description: string;
    totalDuration: number;
    tags: string[];
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
    const methods = useForm<FormValues>({
        defaultValues: {
            name: data ? data.name : '',
            description: data ? data.description : '',
            totalDuration: data ? data.totalDuration : 0,
            tags: data ? data.tags : [],
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
            <Input name="description" label="Description" />
            <NumberInput name="totalDuration" label="Duration" />
            <AutocompleteChip name="tags" label="Tags" options={['super junior', 'dragon', 'britney spears']}/>
            <SongTrackLabelsField />
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={methods.handleSubmit(handleSubmit)}
                >
                    Save
                </Button>
            </Box>
        </FormProvider>
    );
};

export default SongForm;