import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete, Chip, FormControl, FormHelperText, TextField } from '@mui/material';

interface InputProps {
    name: string;
    label: string;
    options: string[];
}
export const AutocompleteChip: React.FC<InputProps> = ({ name, label, options }) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <FormControl
            sx={{width: '100%'}}
            variant="standard"
            margin="normal"
            error={Boolean(errors?.[name]?.message)}
        >
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        multiple
                        freeSolo
                        options={options}
                        renderValue={(value: readonly string[], getItemProps) =>
                            value.map((option: string, index: number) => {
                                const { key, ...itemProps } = getItemProps({ index });
                                return (
                                    <Chip variant="filled" label={option} key={key} {...itemProps} sx={{ borderRadius: 1 }} />
                                );
                            })
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label={label}
                                placeholder="Favorites"
                            />
                        )}
                        onChange={(event, newValue) => field.onChange(newValue)}
                    />
                )}
            />
            {errors[name] && <FormHelperText>{(errors[name].message as string).toString()}</FormHelperText>}
        </FormControl>
    );
};

export default AutocompleteChip;
