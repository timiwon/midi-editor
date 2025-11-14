import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

interface InputProps {
    name: string;
    label: string;
}
export const NumberInput: React.FC<InputProps> = ({ name, label }) => {
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
                    type="number"
                    slotProps={{
                        input: {
                            inputProps: {
                                min: 1,
                                max: 100,
                                step: 1,
                            }
                        }
                    }}
                />
            )}
        />
    );
};

export default NumberInput;
