import React from 'react';
import * as Yup from 'yup';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Box } from '@mui/material';

import type { Song } from '@/types/entities';
import { Input, NumberInput } from '@/shared-components/form';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(2, 'Too Short!')
        .max(500, 'Too Long!')
        .required('Required'),
    totalDuration: Yup.number()
        .min(0, 'At least 0 second')
        .max(300, 'Max 300s')
        .typeError('Duration must be a number')
        .required('Required'),
});

interface SongFormProps {
    onSubmit: (values: Omit<Song, "id" | "notes" | "trackLabels">) => void;
}
const SongForm: React.FC<SongFormProps> = ({
    onSubmit
}) => {
    const methods = useForm({
        defaultValues: {
            name: '',
            description: '',
            totalDuration: 0
        },
        mode: 'onChange',
        resolver: yupResolver(validationSchema)
    });

    return (
        <FormProvider {...methods}>
            <Input name="name" label="Name" />
            <Input name="description" label="Description" />
            <NumberInput name="totalDuration" label="Duration" />
            <Box>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={methods.handleSubmit(onSubmit)}
                >
                    Create
                </Button>
            </Box>
        </FormProvider>
    );
};

export default SongForm