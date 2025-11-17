import React from 'react';
import * as Yup from 'yup';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';

import type { Note } from '@/types/entities';

import { Input, NumberInput } from '@/shared-components/form';
import ColorPicker from '@/shared-components/form/ColorPicker';
import EmojiPicker from '@/shared-components/emoji-components/EmojiPicker';
import { Button } from '@/shared-components/styled-components';

interface NoteFormProps {
    maxTime: number;
    data: Note | null;
    onSubmit: (values: Note) => void;
    onDelete?: () => void;
}
const NoteForm: React.FC<NoteFormProps> = ({
    maxTime,
    data,
    onSubmit,
    onDelete
}) => {
    const validationSchema = Yup.object().shape({
        track: Yup.number()
            .min(1, 'Minimum is 1!')
            .max(8, 'Maximum is 8!')
            .required('Required'),
        time: Yup.number()
            .min(0, 'Minimum is 0!')
            .max(maxTime, `Maximum is ${maxTime}s!`)
            .test(
                'time-step',
                'Time step is 0.5s!',
                (value) => (value as number) % 0.5 === 0
            )
            .required('Required'),
        title: Yup.string()
            .max(50, 'Max length is 50 characters!')
            .optional(),
        description: Yup.string()
            .max(500, 'Max length is 500 characters!')
            .optional(),
        color: Yup.string()
            .max(50, 'Max length is 50 characters!')
            .optional(),
        icon: Yup.string()
            .max(50, 'Max length is 50 characters!')
            .optional(),
    });

    const methods = useForm({
        defaultValues: {
            track: data ? data.track : 1,
            time: data ? data.time : 0,
            title: data ? data.title : '',
            description: data ? data.description : undefined,
            color: data ? data.color : '',
            icon: data ? data.icon : '',
        },
        mode: 'all',
        resolver: yupResolver(validationSchema),
    });

    function handleSubmit(values: Note) {
        onSubmit(values);
    }
    
    return (
        <FormProvider {...methods}>
            <NumberInput name="track" label="Track" />
            <NumberInput name="time" label="Time" />
            <Input name="title" label="Title" />
            <Input name="description" minRows={4} maxRows={6} label="Description" />
            <ColorPicker name='color' label='Color'/>
            <EmojiPicker name="icon" label="Icon" />
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                {onDelete &&
                    <Button
                        type="submit"
                        variant="contained"
                        color="error"
                        sx={{ mr: 1 }}
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                }
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

export default NoteForm;