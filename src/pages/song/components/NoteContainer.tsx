import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import type { Song } from "@/types/entities";
import { useUtils } from "@/hooks";

import NoteCell from "./NoteCell";

interface NoteContainerProps {
    song: Song
}

const NoteContainer: React.FC<NoteContainerProps> = ({song}) => {
    const { isMobile, isTablet } = useUtils();

    const trackLabels = song.trackLabels;
    const notes = song.notes;

    const timeCellWidth = 60;
    const cellWidth = isMobile ? 80 : isTablet ? 100 : 120; // Track width 80-120px (responsive)
    const cellHeight = isMobile ? 40 : 60;
    const maxDuration = notes ? notes.reduce((max, note) => {
        return note.time > max ? note.time : max;
    }, 0) : 1;
    const rows: number[] = Array.from({ length: Math.round(maxDuration/5) + 3}); // time interval height 40-60px per 5 seconds
    let toggleBodyCellClass = 'major-cell';

    return (
        <TableContainer sx={{ minWidth: 80, maxWidth: `${trackLabels?.length * cellWidth + timeCellWidth}px`, mb: 5 }}>
            <Table stickyHeader={true}>
                <TableHead>
                    <TableRow>
                        <TableCell width={`${timeCellWidth}px`} align='center' />
                        {trackLabels && trackLabels.map((track, index) =>
                            <TableCell
                                key={index}
                                width={`${cellWidth}px`}
                                className={index % 2 === 0 ? 'major-cell' : ''}
                                align='center'
                            >
                                {track}
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row, index) => {
                        if (index % 2 === 0) {
                            toggleBodyCellClass = toggleBodyCellClass.length === 0 ? 'major-cell' : '';
                        }

                        return (<TableRow key={index}>
                            {/**
                             * Time Column
                             */}
                            <TableCell
                                className={`note-main-cell ${toggleBodyCellClass}`}
                                align="center"
                                width={`${timeCellWidth}px`}
                                height={`${cellHeight}px`}
                                sx={{
                                    pt: '10px',
                                    lineHeight: 0,
                                    verticalAlign: 'top',
                                }}
                            >
                                {index * 5 % 10 === 0 ? `${index * 5}s` : ''}
                            </TableCell>

                            {/**
                             * Content Column
                             */}
                            {trackLabels && trackLabels.map((track, trackIndex) =>
                                <TableCell
                                    key={trackIndex}
                                    className={`note-main-cell ${toggleBodyCellClass}`}
                                    align="center"
                                    width={`${cellWidth}px`}
                                    height={`${cellHeight}px`}
                                    sx={{
                                        pt: 0,
                                        pb: 0
                                    }}
                                >
                                    <NoteCell
                                        trackIndex={trackIndex + 1}
                                        notes={notes ? notes.filter(note =>
                                            note.time < (index * 5 + 5) &&
                                            note.time >= index * 5 &&
                                            note.track === trackIndex + 1
                                        ) : []}
                                        mainCell={{
                                            width: cellWidth,
                                            height: cellHeight
                                        }}
                                        rangeTime={[index * 5, index * 5 + 5]}
                                    />
                                </TableCell>
                            )}
                        </TableRow>)
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default NoteContainer;
