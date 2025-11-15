import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useForm, FormProvider, useFieldArray, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Box, TextField, IconButton, FormHelperText, FormControl } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
    trackLabels: Yup.array()
        .min(1, 'Track Labels must contain at least one item')
        .max(8, 'Max 8 items')
        .of(Yup.string()
            .min(2, 'Too Short!')
            .max(10, 'Too Long!')
            .required('Required')
        )
        .required('Required'),
});

type FormValues = {
    name: string;
    description: string;
    totalDuration: number;
    trackLabels: string[];
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
            trackLabels: data ? data.trackLabels : []
        },
        mode: 'onChange',
        resolver: yupResolver(validationSchema)
    });

    return (
        <FormProvider {...methods}>
            <Input name="name" label="Name" />
            <Input name="description" label="Description" />
            <NumberInput name="totalDuration" label="Duration" />
            <TrackLabelsField />
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={methods.handleSubmit(onSubmit)}
                >
                    Save
                </Button>
            </Box>
        </FormProvider>
    );
};

const TrackLabelsField = () => {
    const { control, register, trigger, formState: { errors } } = useFormContext<FormValues>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'trackLabels' as never,
    });

    useEffect(() => {
        trigger(`trackLabels`).then(isValid => {
            if (!isValid && fields.length > 0) {
                remove(fields.length - 1);
            }
        });
    }, [fields])

    return (
        <FormControl
            variant="standard"
            margin="normal"
            error={Boolean(errors.trackLabels?.message)}
        >
            <Button
                size='small'
                variant='outlined'
                color='success'
                sx={{ width: 195, mb: 1 }}
                onClick={async (e) => {
                    e.preventDefault();

                    const isValid = await trigger(`trackLabels`);
                    if (!isValid && fields.length > 0) {
                        return;
                    }

                    append("");
                }}
            >
                add Track
            </Button>
            {Boolean(errors.trackLabels?.message) && (
                <FormHelperText>{errors.trackLabels?.message?.toString()}</FormHelperText>
            )}
            {fields.map((field, index) => (
                <Box key={field.id} sx={{ mb: 1 }}>
                    <TextField
                        size='small'
                        {...register(`trackLabels.${index}`)}
                    />
                    <IconButton onClick={() => remove(index)}>
                        <DeleteIcon />
                    </IconButton>
                    {Boolean(errors.trackLabels?.[index]) && (
                        <FormHelperText error>{errors.trackLabels?.[index]?.message}</FormHelperText>
                    )}
                </Box>
            ))}
        </FormControl>
    )
}

export default SongForm;