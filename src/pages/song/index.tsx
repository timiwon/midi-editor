import { useParams } from 'react-router-dom';
import { Box, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { useSong } from '@/hooks';

import PageDescription from '@/shared-components/PageDescription';
import MainBlock from '@/shared-components/MainBlock';
import { cn } from '@/lib/utils';

function SongPage() {
    const { loading, songId } = useParams();
    const { song } = useSong(songId);

    return (
        <Box>
            {/** page description */}
            {song && <PageDescription
                title={song.name}
                content={song.description}
            />}

            <MainBlock>
                <TableContainer>
                    <Table stickyHeader={true} sx={{}}>
                        <TableHead>
                            <TableRow>
                                {song?.trackLabels.map((track, index) =>
                                    <TableCell
                                        className={cn({
                                            'song-grid-cell-major': index%2===0,
                                            'song-grid-cell': index%2===0
                                        })}
                                        key={index}
                                        align='center'
                                    >{track}</TableCell>)}
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </MainBlock>
        </Box>
    );
}

export default SongPage