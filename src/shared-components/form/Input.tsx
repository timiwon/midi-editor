import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

interface InputProps {
    name: string;
    label: string;
}
export const Input: React.FC<InputProps> = ({ name, label }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    label={label}
                    error={!!error}
                    helperText={error ? error.message : null}
                    fullWidth
                    margin="normal"
                />
            )}
        />
    );
};

export default Input;
