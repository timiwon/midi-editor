import { Box } from "@mui/material";

import MainBlock from "@/shared-components/MainBlock";
import PageDescription from "@/shared-components/PageDescription";
import ActionToolbar from "./components/ActionToolbar";
import SongModal from "./components/SongModal";
import { useState } from "react";

const Home = () => {
    const [isOpenSongModal, setIsOpenSongModal] = useState(false)
    
    return (
        <Box>
            {/** page description */}
            <PageDescription
                title="Welcome to MIDI"
                content="MIDI Editor - a web application similar to a piano roll MIDI editor where users can create, visualize, and manage musical notes placed at specific time points across multiple tracks (similar to FL Studio, Ableton Live, or GarageBand's piano roll view)."
            />

            {/** List Songs */}
            <MainBlock>
                {/** Action toolbar */}
                <ActionToolbar onCreateBtnClick={() => setIsOpenSongModal(true)}/>
            </MainBlock>


            <SongModal
                open={isOpenSongModal}
                onClose={() => setIsOpenSongModal(false)}
            />
        </Box>
    )
}; 

export default Home