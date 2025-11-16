import React, { useState } from 'react';
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
            render={({ field: { value, disabled, name, ref, onChange, onBlur }, fieldState: { error } }) => (
                <TextField
                    value={value}
                    disabled={disabled}
                    name={name}
                    ref={ref}
                    onBlur={onBlur}
                    onChange={onChange}
                    label={label}
                    error={!!error}
                    helperText={error ? error.message : `${value.length} characters`}
                    fullWidth
                    margin="normal"
                />
            )}
        />
    );
};

export default Input;
