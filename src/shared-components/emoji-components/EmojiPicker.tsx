import type React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Button, FormControl, FormHelperText, FormLabel, Typography } from '@mui/material';
import EmojiPickerReact from 'emoji-picker-react';
import EmojiIcon from './EmojiIcon';

interface EmojiPickerProps {
    name: string;
    label: string;
}
const EmojiPicker: React.FC<EmojiPickerProps> = ({name, label}) => {
    const { control, formState: { errors } } = useFormContext();

    return (
        <FormControl
            sx={{ width: '100%' }}
            variant="standard"
            margin="normal"
            error={Boolean(errors?.[name]?.message)}
        >
            <Controller
                name={name}
                control={control}
                defaultValue="#ffffff"
                render={({ field }) => (<>
                    <Typography>{label}: <EmojiIcon unified={field.value} size={25}/></Typography>
                    <Button onClick={() => field.onChange('')}>clear emoji</Button>
                    <EmojiPickerReact
                        skinTonesDisabled={true}
                        onEmojiClick={(emojiObject) => field.onChange(emojiObject.emoji)}
                    />
                </>)}
            />
            {errors[name] && <FormHelperText>{(errors[name].message as string).toString()}</FormHelperText>}
        </FormControl>
    );
};

export default EmojiPicker;