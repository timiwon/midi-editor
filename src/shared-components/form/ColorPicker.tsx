import type React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { SketchPicker } from 'react-color';
import { FormControl, FormHelperText, Typography } from '@mui/material';

interface ColorPickerProps {
    name: string;
    label: string;
}
const ColorPicker: React.FC<ColorPickerProps> = ({ name, label }) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <FormControl
            sx={{ width: '100%' }}
            variant="standard"
            margin="normal"
            error={!!errors?.[name]?.message}
        >
            <Typography color={`${errors?.[name]?.message ? 'error' : ''}`}>{label}</Typography>
            {errors[name] && <FormHelperText>{(errors[name].message as string).toString()}</FormHelperText>}
            <Controller
                name={name}
                control={control}
                defaultValue="#ffffff"
                render={({ field }) => (
                    <SketchPicker
                        color={field.value}
                        onChangeComplete={(color) => field.onChange(color.hex)}
                    />
                )}
            />
        </FormControl>
    );
};

export default ColorPicker;