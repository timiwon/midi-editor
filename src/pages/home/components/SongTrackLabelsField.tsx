import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Box, Button, FormControl, FormHelperText, IconButton, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import type { FormValues } from "./SongForm";

const SongTrackLabelsField = () => {
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

export default SongTrackLabelsField;