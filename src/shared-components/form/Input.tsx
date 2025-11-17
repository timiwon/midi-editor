import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

interface InputProps {
    name: string;
    label: string;
    minRows?: number;
    maxRows?: number;
}
export const Input: React.FC<InputProps> = ({ name, label, minRows = 1, maxRows = 1 }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, disabled, name, ref, onChange, onBlur }, fieldState: { error } }) => (
                <TextField
                    multiline={minRows>1}
                    minRows={minRows}
                    maxRows={maxRows}
                    value={value}
                    disabled={disabled}
                    name={name}
                    ref={ref}
                    onBlur={onBlur}
                    onChange={onChange}
                    label={label}
                    error={!!error}
                    helperText={error ? error.message : `${value ? value.length : 0} characters`}
                    fullWidth
                    margin="normal"
                />
            )}
        />
    );
};

export default Input;
