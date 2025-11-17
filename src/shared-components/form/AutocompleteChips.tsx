import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete, Chip, FormControl, FormHelperText, TextField } from '@mui/material';

interface AutocompleteChipProps {
    name: string;
    label: string;
    options: string[];
    limitTags?: number;
}
export const AutocompleteChip: React.FC<AutocompleteChipProps> = ({ name, label, options, limitTags = 2 }) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <FormControl
            sx={{width: '100%'}}
            variant="standard"
            margin="normal"
            error={!!errors?.[name]?.message}
        >
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        multiple
                        freeSolo
                        limitTags={limitTags} 
                        options={options}
                        renderValue={(value: readonly string[], getItemProps) =>
                            <>
                                {value.slice(0, 2).map((option, index) => (
                                    <Chip
                                        variant='outlined'
                                        label={option}
                                        {...getItemProps({ index })}
                                        key={index}
                                        sx={{ borderRadius: 1 }}
                                    />
                                ))}
                                {value.length > 2 && `+${value.length - 2}`}
                            </>
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
