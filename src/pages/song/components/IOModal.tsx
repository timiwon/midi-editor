import React, { useContext } from 'react';
import * as Yup from 'yup';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';

import type { Song } from '@/types/entities';

import { Input } from '@/shared-components/form';
import BaseModal from "@/shared-components/modals/BaseModal";
import SongContext from '../SongContext';

interface IOModalProps {
    open: boolean;
    data: Song;
    onClose: () => void; 
    onSave: (values: string) => void;
}
const IOModal: React.FC<IOModalProps> = ({
    open,
    data,
    onClose,
    onSave,
}) => {
    function handleSubmit (values: string) {
        onSave(values);
    }

    // exclude id from song data
    const { id, ...args } = data;

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={'Import/Export'}
            description={''}
        >
            <IOForm data={JSON.stringify(args, null, 4)} onSubmit={handleSubmit}/>
        </BaseModal>
    );
};

interface IOFormProps {
    data: string;
    onSubmit: (values: string) => void;
}
const IOForm: React.FC<IOFormProps> = ({data, onSubmit}) => {
    const { loading } = useContext(SongContext);

    const validationSchema = Yup.object().shape({
        song: Yup.string()
            .required('Required'),
    });
    const methods = useForm({
        defaultValues: {
            song: data ? data : '',
        },
        mode: 'onChange',
        resolver: yupResolver(validationSchema)
    });

    function handleSubmit({ song }: { song: string }) {
        onSubmit(song);
    }

    return (
        <FormProvider {...methods}>
            <Input name="song" minRows={20} maxRows={20} label="Song" />
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <Button
                    disabled={loading}
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={methods.handleSubmit(handleSubmit)}
                >
                    {loading ? 'Importing...' : 'Import'}
                </Button>
            </Box>
        </FormProvider>
    )
};

export default IOModal