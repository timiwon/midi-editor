import { useParams } from 'react-router-dom';

import PageDescription from '@/shared-components/PageDescription';
import { Box } from '@mui/material';

function SongPage() {
    const { songId } = useParams();

    return (
        <Box>
            {/** page description */}
            <PageDescription
                title={`Welcome to MIDI - ${songId}`}
                content="MIDI Editor - a web application similar to a piano roll MIDI editor where users can create, visualize, and manage musical notes placed at specific time points across multiple tracks (similar to FL Studio, Ableton Live, or GarageBand's piano roll view)."
            />
        </Box>
    );
}

export default SongPage