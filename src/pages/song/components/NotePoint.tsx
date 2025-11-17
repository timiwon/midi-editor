import type React from "react";
import { Box, Tooltip, Typography, useTheme } from "@mui/material";

import type { Note } from "@/types/entities";
import { useUtils } from "@/hooks";

import EmojiIcon from "@/shared-components/emoji-components/EmojiIcon";

interface NotePointProps {
    position: number;
    list: {[key: number]: Note};
    chunk: {
        length: number;
        width: number;
        height: number;
    };
    onEditNoteClick: (noteData: Note) => void;
}
const NotePoint: React.FC<NotePointProps> = ({ position, list, chunk, onEditNoteClick }) => {
    const theme = useTheme();
    const { isMobile } = useUtils();
    const noteSize = isMobile ? 16 : 24; // Note points as colored circular dots (16-24px) at correct (track, time) positions

    function isHexColor(color: string) {
        return /^#([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(color);
    }

    function getNoteColor(color: string) {
        return isHexColor(color) ? color : theme.palette.primary.dark;
    }

    if (position in list) {
        return (
            <Tooltip
                arrow
                slotProps={{
                    popper: {
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, 20],
                                },
                            },
                        ],
                    },
                }}
                title={<Box>
                    <Typography variant="body1">
                        {list[position].title}
                        {' - '}
                        <Typography variant="body2" component='span'>{list[position].time}s</Typography>
                    </Typography>
                    <Typography variant="body1" whiteSpace={'pre-wrap'}>{list[position].description}</Typography>
                </Box>}
            >
                <Box>
                    {list[position].icon && <EmojiIcon
                        sx={{
                            position: 'absolute',
                            width: `${noteSize}px`,
                            height: `${noteSize}px`,
                            '&:hover': {
                                opacity: 0.2,
                            },
                        }}
                        unified={list[position].icon}
                        size={25}
                        onClick={() => onEditNoteClick(list[position])}
                    />}
                    {!list[position].icon && <Box
                        className={`note-${position}`}
                        sx={{
                            position: 'absolute',
                            width: `${noteSize}px`,
                            height: `${noteSize}px`,
                            borderRadius: '50%',
                            bgcolor: `${getNoteColor(list[position].color)}`,
                            '&:hover': {
                                opacity: 0.2,
                            },
                        }}
                        onClick={() => onEditNoteClick(list[position])}
                    ></Box>}
                </Box>
            </Tooltip>
        );
    }

    return (<Box
        sx={{
            position: 'relative',
            width: `1px`,
            m: '0 10px',
            height: `${chunk.height}px`,
        }}
    ></Box>);

};

export default NotePoint;