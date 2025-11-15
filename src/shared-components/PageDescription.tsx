import React from "react";
import { Typography } from "@mui/material";

import MainBlock from "./MainBlock";

interface PageDescriptionProps {
    title: string;
    content: string;
}
const PageDescription: React.FC<PageDescriptionProps> = ({ title, content }) => (
    <MainBlock sx={{ mt: 0, mb: 10 }}>
        <Typography variant="h5" gutterBottom>
            {title}

        </Typography>
        <Typography variant="body1" align="justify">
            {content}
        </Typography>
    </MainBlock>
)

export default PageDescription;
