import { Box, Skeleton } from "@mui/material";

function SongCardSkeleton() {
    return (<Box className="mb-5 w-full md:w-1/2">
        <Skeleton className="mb-0.5" height={148} variant="rectangular"/>
        <Skeleton height={72} variant="rectangular"/>
    </Box>
    );
};

export default SongCardSkeleton;